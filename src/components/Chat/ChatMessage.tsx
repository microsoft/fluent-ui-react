import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { FocusZone } from '../FocusZone'
import ChatMessageBehavior from '../../lib/accessibility/Behaviors/Chat/ChatMessageBehavior'

class ChatMessage extends UIComponent<any, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    as: customPropTypes.as,

    /** Child content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.string,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['accessibility', 'as', 'children', 'className', 'content', 'mine']

  static defaultProps = {
    as: 'li',
    accessibility: ChatMessageBehavior,
  }

  renderComponent({ ElementType, classes, rest, accessibility }) {
    const { children, content } = this.props

    return (
      <FocusZone
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        isCircularNavigation={true}
        {...accessibility.attributes.root}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </FocusZone>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
