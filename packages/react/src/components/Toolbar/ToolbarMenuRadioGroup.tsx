import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  AutoControlledComponent,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandCollection,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'
import { mergeComponentVariables } from '../../lib/mergeThemes'
import Box, { BoxProps } from '../Box/Box'
import {
  toolbarMenuRadioGroupBehavior,
  toolbarMenuItemRadioBehavior,
} from '../../lib/accessibility'

export interface ToolbarMenuRadioGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Index of the currently active item. */
  activeIndex?: number

  /** Initial activeIndex value. */
  defaultActiveIndex?: number

  /** Shorthand array of props for ToolbarMenuRadioGroup. */
  items?: ShorthandCollection<ToolbarMenuItemProps>

  /**
   * Called on item click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>
}

export interface ToolbarMenuRadioGroupState {
  activeIndex: ToolbarMenuRadioGroupProps['activeIndex']
}

export interface ToolbarMenuRadioGroupSlotClassNames {
  wrapper: string
}

class ToolbarMenuRadioGroup extends AutoControlledComponent<
  WithAsProp<ToolbarMenuRadioGroupProps>,
  ToolbarMenuRadioGroupState
> {
  static displayName = 'ToolbarMenuRadioGroup'

  static create: ShorthandFactory<ToolbarMenuRadioGroupProps>

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static slotClassNames: ToolbarMenuRadioGroupSlotClassNames = {
    wrapper: `${ToolbarMenuRadioGroup.className}__wrapper`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon(),
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    items: customPropTypes.collectionShorthand,
    onItemClick: PropTypes.func,
    wrapper: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: toolbarMenuRadioGroupBehavior,
    wrapper: {},
  }

  static autoControlledProps = ['activeIndex']

  handleItemOverrides = variables => (
    predefinedProps: ToolbarMenuItemProps,
  ): ToolbarMenuItemProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(this.props, 'onItemClick', e, itemProps)

      this.setState({ activeIndex: index })
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
    wrapper: null,
  })

  renderComponent({ ElementType, classes, unhandledProps, accessibility, styles }) {
    const { items, variables, wrapper } = this.props
    const { activeIndex } = this.state

    const content = (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {_.map(items, (item, index) =>
          ToolbarMenuItem.create(item, {
            defaultProps: {
              accessibility: toolbarMenuItemRadioBehavior,
              as: 'li',
              checked: activeIndex === index,
              index,
            },
            overrideProps: this.handleItemOverrides(variables),
          }),
        )}
      </ElementType>
    )

    return Box.create(wrapper, {
      defaultProps: {
        as: 'li',
        className: ToolbarMenuRadioGroup.slotClassNames.wrapper,
        styles: styles.wrapper,
        ...accessibility.attributes.wrapper,
        ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper),
      },
      overrideProps: {
        children: content,
      },
    })
  }
}

ToolbarMenuRadioGroup.create = createShorthandFactory({
  Component: ToolbarMenuRadioGroup,
})

/**
 * A ToolbarMenuRadioGroup renders ToolbarMenuItem as a group of mutually exclusive options.
 */
export default withSafeTypeForAs<typeof ToolbarMenuRadioGroup, ToolbarMenuRadioGroupProps, 'ul'>(
  ToolbarMenuRadioGroup,
)
