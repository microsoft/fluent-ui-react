import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'

import { FocusZone } from '../FocusZone'
import FocusAction from '../../lib/actions/FocusAction'
import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'
import keyboardKey from 'keyboard-key'

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

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['accessibility', 'as', 'children', 'className', 'messages']

  static defaultProps = {
    as: 'ul',
    accessibility: ChatBehavior,
  }

  static Message = ChatMessage

  focusZone: FocusZone
  setFocusZone = fz => (this.focusZone = fz)

  focusActionHandler = FocusAction.handler(() => {
    this.focusZone.focus()
  })

  private uniqueId: string = _.uniqueId('Chat')

  constructor(props, ctx) {
    super(props, ctx)
    this.registerActionHandler(this.focusActionHandler)

    this.handleKey(keyboardKey.Escape, (key, event) => {
      event.preventDefault()
      this.executeAction(FocusAction.execute())
    })
  }

  renderComponent({ ElementType, classes, rest, accessibility }) {
    const { children, messages } = this.props

    // return this.props.focusManagerFactory.create({}, )

    return (
      <FocusZone
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        defaultActiveElement={`*[data-chat-component-id="${this.uniqueId}"] > *:last-child`}
        isInnerZoneKeystroke={event => event.key === 'Enter'}
        onKeyDown={this.keyHandler()}
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
        {...accessibility.attributes.root}
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
