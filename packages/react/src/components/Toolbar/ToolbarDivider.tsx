import * as React from 'react'
import {
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthandFactory,
  UIComponentProps,
  UIComponent,
  commonPropTypes,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { WithAsProp, withSafeTypeForAs } from '../../types'
import { defaultBehavior } from '../../lib/accessibility'

export interface ToolbarDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility
}

class ToolbarDivider extends UIComponent<WithAsProp<ToolbarDividerProps>> {
  static displayName = 'ToolbarDivider'

  static create: Function

  static className = 'ui-toolbar__divider'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
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
 * A ToolbarDivider is a non-focusable element that visually segments Toolbar items.
 */
export default withSafeTypeForAs<typeof ToolbarDivider, ToolbarDividerProps>(ToolbarDivider)
