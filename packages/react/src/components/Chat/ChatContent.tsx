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

export interface ChatContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility
}

class ChatContent extends UIComponent<WithAsProp<ChatContentProps>> {
  static displayName = 'ChatContent'
  static propTypes = commonPropTypes.createCommon()

  static create: ShorthandFactory<ChatContentProps>
  static className = 'ui-chat__content'

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

ChatContent.create = createShorthandFactory({ Component: ChatContent, mappedProp: 'content' })

/**
 * TODO
 */
export default withSafeTypeForAs<typeof ChatContent, ChatContentProps, 'div'>(ChatContent)
