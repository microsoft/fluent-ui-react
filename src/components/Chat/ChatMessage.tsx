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
} from '../../lib'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../../types/utils'
import { chatMessageBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'

import Text from '../Text/Text'
import Slot from '../Slot/Slot'

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
  author?: ShorthandValue

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** Timestamp of the message. */
  timestamp?: ShorthandValue

  onFocus?: ComponentEventHandler<ChatMessageProps>
}

export interface MessageState {
  isFromKeyboard: boolean
}

/**
 * A chat message represents a single statement communicated to a user.
 */
class ChatMessage extends UIComponent<ReactProps<ChatMessageProps>, MessageState> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
    rest,
    styles,
  }: RenderResultConfig<ChatMessageProps>) {
    const { author, children, content, mine, timestamp } = this.props
    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        onFocus={this.handleFocus}
        className={className}
      >
        {childrenPropExists ? (
          children
        ) : (
          <>
            {!mine &&
              Text.create(author, { defaultProps: { size: 'small', styles: styles.author } })}
            {Text.create(timestamp, {
              defaultProps: { size: 'small', styles: styles.timestamp, timestamp: true },
            })}
            {Slot.create(content, { defaultProps: { styles: styles.content } })}
          </>
        )}
      </ElementType>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, 'content')

export default ChatMessage
