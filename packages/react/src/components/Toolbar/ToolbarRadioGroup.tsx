import * as React from 'react'
import * as _ from 'lodash'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  childrenExist,
  commonPropTypes,
} from '../../lib'
import { mergeComponentVariables } from '../../lib/mergeThemes'

import { ShorthandCollection, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

import ToolbarDivider from './ToolbarDivider'
import ToolbarItem from './ToolbarItem'

export type ToolbarRadioGroupItemShorthandKinds = 'divider' | 'item'

export interface ToolbarRadioGroupProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Shorthand array of props for ToolbarRadioGroup. */
  items?: ShorthandCollection<ToolbarRadioGroupItemShorthandKinds>
}

class ToolbarRadioGroup extends UIComponent<WithAsProp<ToolbarRadioGroupProps>> {
  static displayName = 'ToolbarRadioGroup'

  static className = 'ui-toolbars' // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
  }

  handleItemOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  })

  renderItems(items, variables) {
    const itemOverridesFn = this.handleItemOverrides(variables)
    return _.map(items, (item, index) => {
      const kind = _.get(item, 'kind', 'item')

      if (kind === 'divider') {
        return ToolbarDivider.create(item, { overrideProps: itemOverridesFn })
      }
      return ToolbarItem.create(item, { overrideProps: itemOverridesFn })
    })
  }

  renderComponent({ ElementType, classes, variables, accessibility, unhandledProps }) {
    const { children, items } = this.props
    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : this.renderItems(items, variables)}
      </ElementType>
    )
  }
}

ToolbarRadioGroup.create = createShorthandFactory({
  Component: ToolbarRadioGroup,
  mappedProp: 'content',
})

/**
 * Toolbar radiogroup groups items where only one item can be active.
 * The radiogroup does not guarantee that, it just serves accessibility purposes.
 */
export default withSafeTypeForAs<typeof ToolbarRadioGroup, ToolbarRadioGroupProps>(
  ToolbarRadioGroup,
)
