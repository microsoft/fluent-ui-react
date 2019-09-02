import * as React from 'react'
import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  commonPropTypes,
  CreateShorthandFactoryResult,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface ToolbarDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility
}

class ToolbarDivider extends UIComponent<WithAsProp<ToolbarDividerProps>> {
  static displayName = 'ToolbarDivider'

  static create: CreateShorthandFactoryResult

  static className = 'ui-toolbar__divider'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      />
    )
  }
}

ToolbarDivider.create = createShorthandFactory({ Component: ToolbarDivider, mappedProp: 'content' })

/**
 * A ToolbarDivider is a non-actionable element that visually segments Toolbar items.
 */
export default withSafeTypeForAs<typeof ToolbarDivider, ToolbarDividerProps>(ToolbarDivider)
