import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent, commonPropTypes } from '../../lib'
import ChatItem from './ChatItem'
import ChatMessage from './ChatMessage'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { chatBehavior } from '../../lib/accessibility'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { childrenDependentRtlAttributes, RtlAttributesProvider } from '../../lib/rtl'

export interface ChatProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default chatBehavior
   * */
  accessibility?: Accessibility

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandValue[]

  /**
   * Rtl attributes function if overridden by the user.
   * @default childrenDependentRtlAttributes
   */
  rtlAttributes?: RtlAttributesProvider
}

/**
 * A Chat displays messages between users.
 */
class Chat extends UIComponent<ReactProps<ChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    accessibility: chatBehavior,
    as: 'ul',
    rtlAttributes: childrenDependentRtlAttributes,
  }

  static Item = ChatItem
  static Message = ChatMessage

  protected actionHandlers: AccessibilityActionHandlers = {
    focus: () => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, rtlAttributes }) {
    const { children, items } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rtlAttributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : _.map(items, item => ChatItem.create(item))}
      </ElementType>
    )
  }
}

export default Chat
