import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'

export interface IChatProps {
  as?: any
  className?: string
  children?: ReactChildren
  messages?: ItemShorthand[]
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'
import { Accessibility, AccessibilityActions } from '../../lib/accessibility/interfaces'
import { FocusZone } from '../../lib/accessibility/FocusZone'

class Chat extends UIComponent<Extendable<IChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
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

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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

  static defaultProps = { accessibility: ChatBehavior as Accessibility, as: 'div' }

  static Message = ChatMessage

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, messages } = this.props

    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children)
          ? children
          : _.map(messages, message => ChatMessage.create(message))}
      </ElementType>
    )
  }
}

export default Chat
