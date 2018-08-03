import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import chatRules from './chatRules'
import ChatMessage from './ChatMessage'

import { FocusZone } from '../FocusZone'
import FocusAction from '../../lib/actions/FocusAction'
import { AccBehaviorFactory, AccBehaviorType } from '../../lib/accessibility/AccBehaviorFactory'

class Chat extends UIComponent<any, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    children: PropTypes.node,

    /** Shorthand array of messages. */
    messages: PropTypes.arrayOf(PropTypes.any),
  }

  static handledProps = ['as', 'children', 'className', 'messages']

  static defaultProps = { as: 'ul' }

  static rules = chatRules

  static Message = ChatMessage

  focusZone: FocusZone
  setFocusZone = fz => (this.focusZone = fz)

  focusActionHandler = FocusAction.handler(() => {
    this.focusZone.focus()
  })

  private uniqueId: string = _.uniqueId('Chat')

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.chat,
    )

    this.registerActionHandler(this.focusActionHandler)
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, messages } = this.props

    // return this.props.focusManagerFactory.create({}, )

    return (
      <FocusZone
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        defaultActiveElement={`*[data-chat-component-id="${this.uniqueId}"] > *:last-child`}
        isInnerZoneKeystroke={event => event.key === 'Enter'}
        onKeyDown={this.accBehavior.onKeyDown(this, this.props, this.state)}
        ref={this.setFocusZone}
        onActiveElementChanged={(element, ev) => {
          console.error('on active element changed', 'element', element, 'ev', ev)
        }}
        onBeforeFocus={childElement => {
          console.error('on before focus', 'childElement', childElement)
          return true
        }}
        onFocusNotification={() => {
          console.error('on focus notification')
        }}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
        data-chat-component-id={this.uniqueId}
      >
        {childrenExist(children)
          ? children
          : _.map(messages, message => ChatMessage.create(message))}
      </FocusZone>
    )
  }
}

export default Chat
