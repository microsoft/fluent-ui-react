import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'

export interface IChatProps {
  as?: any
  className?: string
  children?: ReactChildren
  messages?: ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class Chat extends UIComponent<Extendable<IChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    children: PropTypes.node,

    /** Shorthand array of messages. */
    messages: PropTypes.arrayOf(PropTypes.any),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
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

  actionHandlers: AccessibilityActionHandlers = {
    focus: event => {
      if (this.focusZone) {
        this.focusZone.focus()
      }
    },
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, messages } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
      >
        {childrenExist(children)
          ? children
          : _.map(messages, message => ChatMessage.create(message, { generateKey: true }))}
      </ElementType>
    )
  }
}

export default Chat
