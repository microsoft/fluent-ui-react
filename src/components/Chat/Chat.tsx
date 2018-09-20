import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatItem from './ChatItem'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import ChatAction from './ChatAction'
import ChatBubble from './ChatBubble'

export interface IChatProps {
  as?: any
  className?: string
  children?: ReactChildren
  items?: ItemShorthand[]
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

    /** Shorthand array of the items inside the chat. */
    items: PropTypes.arrayOf(PropTypes.any),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['as', 'children', 'className', 'items', 'styles', 'variables']

  static defaultProps = { as: 'ul' }

  static Item = ChatItem
  static Action = ChatAction
  static Bubble = ChatBubble

  renderComponent({ ElementType, classes, rest }) {
    const { children, items } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : _.map(items, item => ChatItem.create(item))}
      </ElementType>
    )
  }
}

export default Chat
