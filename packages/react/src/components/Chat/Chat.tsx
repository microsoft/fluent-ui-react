import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  UIComponent,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import ChatItem, { ChatItemProps } from './ChatItem'
import ChatMessage from './ChatMessage'
import { WithAsProp, withSafeTypeForAs, ShorthandCollection } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { chatBehavior } from '../../lib/accessibility'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'

export interface ChatSlotClassNames {
  item: string
}

export interface ChatProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandCollection<ChatItemProps>
}

class Chat extends UIComponent<WithAsProp<ChatProps>, any> {
  static displayName = 'Chat'

  static className = 'ui-chat'

  static slotClassNames: ChatSlotClassNames = {
    item: `${Chat.className}__item`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),
  }

  static defaultProps = {
    accessibility: chatBehavior,
    as: 'ul',
  }

  static Item = ChatItem
  static Message = ChatMessage

  actionHandlers = {
    focus: () => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, items } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children)
          ? children
          : _.map(items, item =>
              ChatItem.create(item, { defaultProps: { className: Chat.slotClassNames.item } }),
            )}
      </ElementType>
    )
  }
}

/**
 * A Chat displays conversation messages between users.
 */
export default withSafeTypeForAs<typeof Chat, ChatProps, 'ul'>(Chat)
