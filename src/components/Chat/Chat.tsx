import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent, commonPropTypes } from '../../lib'
import ChatItem from './ChatItem'
import ChatMessage from './ChatMessage'
import { Extendable, ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { chatBehavior } from '../../lib/accessibility'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'

export interface ChatProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default chatBehavior
   * */
  accessibility?: Accessibility

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandValue[]

  /**
   * A custom render iterator for rendering each of the Chat items.
   * The default component, props, and children are available for each item.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction
}

/**
 * A Chat displays messages between users.
 */
class Chat extends UIComponent<Extendable<ChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),
    renderItem: PropTypes.func,
  }

  static defaultProps = { accessibility: chatBehavior, as: 'ul' }

  static Item = ChatItem
  static Message = ChatMessage

  protected actionHandlers: AccessibilityActionHandlers = {
    focus: () => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, items, renderItem } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
      >
        {childrenExist(children)
          ? children
          : _.map(items, item => ChatItem.create(item, { render: renderItem }))}
      </ElementType>
    )
  }
}

export default Chat
