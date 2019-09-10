import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as React from 'react'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
  AutoControlledComponent,
} from '../../lib'
import { ShorthandCollection } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem'
import * as PropTypes from 'prop-types'
import { mergeComponentVariables } from '../../lib/mergeThemes'

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

  items?: ShorthandCollection<ToolbarMenuItemProps>

  onIndexChange: Function
}

export interface ToolbarMenuRadioGroupState {
  activeIndex: ToolbarMenuRadioGroupProps['activeIndex']
}

class ToolbarMenuRadioGroup extends AutoControlledComponent<
  ToolbarMenuRadioGroupProps,
  ToolbarMenuRadioGroupState
> {
  static displayName = 'ToolbarMenuRadioGroup'

  static create: ShorthandFactory<ToolbarMenuRadioGroupProps>

  static className = 'ui-toolbar__menucheckboxgroup'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    items: customPropTypes.collectionShorthand,
    onIndexChange: PropTypes.func,
  }

  static autoControlledProps = ['activeIndex']

  handleItemOverrides = variables => (
    predefinedProps: ToolbarMenuItemProps,
  ): ToolbarMenuItemProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      _.invoke(predefinedProps, 'onClick', e, itemProps)
      _.invoke(predefinedProps, 'onIndexChange', e, { ...this.props, activeIndex: index })

      this.setState({ activeIndex: index })
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    const { items, variables } = this.props
    const { activeIndex } = this.state

    return (
      <li>
        <ElementType>
          {_.map(items, (item, index) =>
            ToolbarMenuItem.create(item, {
              defaultProps: {
                checked: activeIndex === index,
                index,
              },
              overrideProps: this.handleItemOverrides(variables),
            }),
          )}
        </ElementType>
      </li>
    )
  }
}

ToolbarMenuRadioGroup.create = createShorthandFactory({
  Component: ToolbarMenuRadioGroup,
})

/**
 * TODO.
 */
export default ToolbarMenuRadioGroup
