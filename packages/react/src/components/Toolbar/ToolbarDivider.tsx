import * as React from 'react'
import {
  ChildrenComponentProps,
  ContentComponentProps,
  UIComponentProps,
  UIComponent,
  commonPropTypes,
} from 'src/lib'
import { Accessibility } from '@stardust-ui/react'
import { WithAsProp, withSafeTypeForAs } from 'src/types'
import { createShorthandFactory } from 'src/lib/factories'

export interface ToolbarDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuDividerBehavior
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

  renderComponent({ ElementType }) {
    return <ElementType>|</ElementType>
  }
}

ToolbarDivider.create = createShorthandFactory({ Component: ToolbarDivider, mappedProp: 'content' })

/**
 * Toolbar divider
 */
export default withSafeTypeForAs<typeof ToolbarDivider, ToolbarDividerProps>(ToolbarDivider)
