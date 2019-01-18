import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'

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
  addRtlSupport,
} from '../../lib'
import { ReactProps, ShorthandValue } from '../../../types/utils'
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
}

/**
 * A chat message represents a single statement communicated to a user.
 */
class ChatMessage extends UIComponent<ReactProps<ChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    author: customPropTypes.itemShorthand,
    mine: PropTypes.bool,
    timestamp: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    accessibility: chatMessageBehavior,
    as: 'div',
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
    const { author, children, content, mine, timestamp } = this.props
    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...unhandledProps}
        className={className}
      >
        {childrenPropExists ? (
          addRtlSupport(children)
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
