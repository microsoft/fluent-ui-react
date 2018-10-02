import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatItem from './ChatItem'
import ChatMessage from './ChatMessage'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'

export interface IChatProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  children?: ReactChildren
  items?: ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
  chatRef?: any
}

class Chat extends UIComponent<Extendable<IChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Child content. */
    children: PropTypes.node,

    /** Shorthand array of the items inside the chat. */
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = { accessibility: ChatBehavior as Accessibility, as: 'ul' }

  static Item = ChatItem
  static Message = ChatMessage

  actionHandlers: AccessibilityActionHandlers = {
    focus: event => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, items } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        ref={this.handleChatRef}
      >
        {childrenExist(children) ? children : _.map(items, item => ChatItem.create(item))}
      </ElementType>
    )
  }

  handleChatRef = (ref: any) => {
    _.invoke(this.props, 'chatRef', ref)
  }
}

export default Chat
