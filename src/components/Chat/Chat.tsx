import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'

export interface IChatProps {
  as?: any
  className?: string
  children?: ReactChildren
  messages?: ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

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
  }

  static handledProps = ['as', 'children', 'className', 'messages', 'styles', 'variables']

  static defaultProps = { as: 'ul' }

  static Message = ChatMessage

  renderComponent({ ElementType, classes, rest }) {
    const { children, messages } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children)
          ? children
          : _.map(messages, message => ChatMessage.create(message, { generateKey: true }))}
      </ElementType>
    )
  }
}

export default Chat
