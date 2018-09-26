import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'

export interface IChatProps {
  as?: any
  className?: string
  children?: ReactChildren
  messages?: ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
  chatRef?: any
  accessibility?: Accessibility
}

class Chat extends UIComponent<Extendable<IChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    as: customPropTypes.as,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    children: PropTypes.node,

    /** Shorthand array of messages. */
    messages: PropTypes.arrayOf(PropTypes.any),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'children',
    'className',
    'messages',
    'styles',
    'variables',
  ]

  static defaultProps = { accessibility: ChatBehavior as Accessibility, as: 'ul' }

  static Message = ChatMessage

  handleChatRef = (ref: any) => {
    _.invoke(this.props, 'chatRef', ref)
  }

  actionHandlers: AccessibilityActionHandlers = {
    focus: event => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, messages } = this.props

    return (
      <ElementType {...rest} className={classes.root} ref={this.handleChatRef}>
        {childrenExist(children)
          ? children
          : _.map(messages, message => ChatMessage.create(message, { generateKey: true }))}
      </ElementType>
    )
  }
}

export default Chat
