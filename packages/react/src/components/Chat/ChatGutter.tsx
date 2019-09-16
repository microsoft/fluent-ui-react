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

export interface ChatGutterProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility
}

class ChatGutter extends UIComponent<WithAsProp<ChatGutterProps>> {
  static displayName = 'ChatGutter'
  static propTypes = commonPropTypes.createCommon()

  static create: ShorthandFactory<ChatGutterProps>
  static className = 'ui-chat__gutter'

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

ChatGutter.create = createShorthandFactory({ Component: ChatGutter, mappedProp: 'content' })

/**
 * A Chat displays conversation messages between users.
 */
export default withSafeTypeForAs<typeof ChatGutter, ChatGutterProps, 'div'>(ChatGutter)
