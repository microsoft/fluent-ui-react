import * as React from 'react'

import {
  childrenExist,
  UIComponent,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ContentComponentProps,
  ShorthandFactory,
  createShorthandFactory,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'

export interface ChatItemGutterProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility
}

class ChatItemGutter extends UIComponent<WithAsProp<ChatItemGutterProps>, any> {
  static displayName = 'ChatItemGutter'
  static propTypes = commonPropTypes.createCommon()

  static create: ShorthandFactory<ChatItemGutterProps>
  static className = 'ui-chat__item__gutter'

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

ChatItemGutter.create = createShorthandFactory({ Component: ChatItemGutter, mappedProp: 'content' })

/**
 * A Chat displays conversation messages between users.
 */
export default withSafeTypeForAs<typeof ChatItemGutter, ChatItemGutterProps, 'div'>(ChatItemGutter)
