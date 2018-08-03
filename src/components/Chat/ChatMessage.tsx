import * as React from 'react'
import PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import {} from '../../lib/accessibility/Behaviors/behaviors'
import chatMessageRules from './chatMessageRules'
import chatMessageVariables from './chatMessageVariables'
import { AccBehaviorFactory, AccBehaviorType } from '../../lib/accessibility/AccBehaviorFactory'
import { FocusZone } from '../FocusZone'

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
  }

  static handledProps = ['as', 'children', 'className', 'content', 'mine']

  static defaultProps = {
    as: 'li',
  }

  static rules = chatMessageRules

  static variables = chatMessageVariables

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.chatMessage,
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <FocusZone
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
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
