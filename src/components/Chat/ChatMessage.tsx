import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import * as _ from 'lodash'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  RenderResultConfig,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  isFromKeyboard,
  rtlTextContainer,
} from '../../lib'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../../types/utils'
import { chatMessageBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'

import Text from '../Text/Text'
import Box from '../Box/Box'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../lib/accessibility/FocusZone'

export interface ChatMessageSlotClassNames {
  actions: string
  author: string
  timestamp: string
}

export interface ChatMessageProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default chatMessageBehavior
   * */
  accessibility?: Accessibility

  /** Author of the message. */
  actions?: ShorthandValue

  /** Author of the message. */
  author?: ShorthandValue

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** Timestamp of the message. */
  timestamp?: ShorthandValue

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ChatMessageProps>
}

export interface ChatMessageState {
  isFromKeyboard: boolean
}

/**
 * A chat message represents a single statement communicated to a user.
 */
class ChatMessage extends UIComponent<ReactProps<ChatMessageProps>, ChatMessageState> {
  static className = 'ui-chat__message'

  static create: Function

  static slotClassNames: ChatMessageSlotClassNames

  static displayName = 'ChatMessage'

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    actions: customPropTypes.itemShorthand,
    author: customPropTypes.itemShorthand,
    mine: PropTypes.bool,
    timestamp: customPropTypes.itemShorthand,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    accessibility: chatMessageBehavior,
    as: 'div',
  }

  public state = {
    isFromKeyboard: false,
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys as navigation (only Tab key should work)
    preventDefault: event => {
      event.preventDefault()
    },
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    unhandledProps,
    styles,
  }: RenderResultConfig<ChatMessageProps>) {
    const { actions, author, children, content, timestamp } = this.props
    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        onFocus={this.handleFocus}
        className={className}
      >
        {childrenPropExists ? (
          children
        ) : (
          <>
            {Box.create(actions, {
              defaultProps: {
                [IS_FOCUSABLE_ATTRIBUTE]: true,
                className: ChatMessage.slotClassNames.actions,
                styles: styles.actions,
              },
            })}

            {Text.create(author, {
              defaultProps: {
                size: 'small',
                styles: styles.author,
                className: ChatMessage.slotClassNames.author,
              },
            })}
            {Text.create(timestamp, {
              defaultProps: {
                size: 'small',
                styles: styles.timestamp,
                timestamp: true,
                className: ChatMessage.slotClassNames.timestamp,
              },
            })}
            {Box.create(content, { defaultProps: { styles: styles.content } })}
          </>
        )}
      </ElementType>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, 'content')
ChatMessage.slotClassNames = {
  actions: `${ChatMessage.className}__actions`,
  author: `${ChatMessage.className}__author`,
  timestamp: `${ChatMessage.className}__timestamp`,
}

export default ChatMessage
