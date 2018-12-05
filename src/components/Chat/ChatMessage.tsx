import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

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
} from '../../lib'
import {
  ComponentVariablesInput,
  ComponentSlotClasses,
  ComponentSlotStylesInput,
} from '../../themes/types'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import Avatar from '../Avatar/Avatar'
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

  /** Chat messages can have an avatar. */
  avatar?: ShorthandValue

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /**
   * A custom render function the author slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderAuthor?: ShorthandRenderFunction

  /**
   * A custom render function the avatar slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderAvatar?: ShorthandRenderFunction

  /**
   * A custom render function the content slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderContent?: ShorthandRenderFunction

  /**
   * A custom render function the timestamp slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderTimestamp?: ShorthandRenderFunction

  /** Timestamp of the message. */
  timestamp?: ShorthandValue
}

/**
 * A chat message represents a single statement communicated to a user.
 */
class ChatMessage extends UIComponent<Extendable<ChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    author: customPropTypes.itemShorthand,
    avatar: customPropTypes.itemShorthand,
    mine: PropTypes.bool,
    renderAuthor: PropTypes.func,
    renderAvatar: PropTypes.func,
    renderContent: PropTypes.func,
    renderTimestamp: PropTypes.func,
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
    rest,
    styles,
    variables,
  }: RenderResultConfig<ChatMessageProps>) {
    const { children } = this.props
    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={className}
      >
        {childrenPropExists ? children : this.renderContent(classes, styles, variables)}
      </ElementType>
    )
  }

  private renderContent = (
    classes: ComponentSlotClasses,
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
  ) => {
    const {
      author,
      avatar,
      content,
      mine,
      renderAuthor,
      renderAvatar,
      renderTimestamp,
      renderContent,
      timestamp,
    } = this.props

    const avatarElement = Avatar.create(avatar, {
      defaultProps: {
        styles: styles.avatar,
        variables: variables.avatar,
      },
      render: renderAvatar,
    })

    const authorElement = Text.create(author, {
      defaultProps: {
        size: 'small',
        styles: styles.author,
      },
      render: renderAuthor,
    })

    const timestampElement = Text.create(timestamp, {
      defaultProps: {
        size: 'small',
        styles: styles.timestamp,
        timestamp: true,
      },
      render: renderTimestamp,
    })

    const contentElement = Slot.create(content, {
      defaultProps: { styles: styles.content },
      render: renderContent,
    })

    return (
      <>
        {!mine && avatarElement}
        <Slot className={cx('ui-chat__message__messageBody', classes.messageBody)}>
          {!mine && authorElement}
          {timestampElement}
          {contentElement}
        </Slot>
        {mine && avatarElement}
      </>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, 'content')

export default ChatMessage
