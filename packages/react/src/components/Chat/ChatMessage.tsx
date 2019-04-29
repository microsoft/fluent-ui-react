import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import * as _ from 'lodash'

import {
  childrenExist,
  createShorthandFactory,
  RenderResultConfig,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  isFromKeyboard,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../types'
import { chatMessageBehavior, toolbarBehavior } from '../../lib/accessibility'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../lib/accessibility/FocusZone'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'

import Box from '../Box/Box'
import Label from '../Label/Label'
import Menu from '../Menu/Menu'
import Text from '../Text/Text'
import Reaction from '../Reaction/Reaction'

export interface ChatMessageSlotClassNames {
  actionMenu: string
  author: string
  timestamp: string
  badge: string
  content: string
  reactionGroup: string
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

  /** Menu with actions of the message. */
  actionMenu?: ShorthandValue

  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom'

  /** Author of the message. */
  author?: ShorthandValue

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** Timestamp of the message. */
  timestamp?: ShorthandValue

  /** Badge attached to the message. */
  badge?: ShorthandValue

  /** A message can format the badge to appear at the start or the end of the message. */
  badgePosition?: 'start' | 'end'

  /**
   * Called after user's blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>, data: ChatMessageProps) => void

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ChatMessageProps>

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end'
}

export interface ChatMessageState {
  focused: boolean
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

  static __isChatMessage = true

  static isTypeOfElement = element => _.get(element, `type.__isChatMessage`)

  static propTypes = {
    ...commonPropTypes.createCommon({ content: 'shorthand' }),
    actionMenu: customPropTypes.itemShorthand,
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    author: customPropTypes.itemShorthand,
    badge: customPropTypes.itemShorthand,
    badgePosition: PropTypes.oneOf(['start', 'end']),
    mine: PropTypes.bool,
    timestamp: customPropTypes.itemShorthand,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    reactionGroup: PropTypes.oneOfType([
      customPropTypes.collectionShorthand,
      customPropTypes.itemShorthand,
    ]),
    reactionGroupPosition: PropTypes.oneOf(['start', 'end']),
  }

  static defaultProps = {
    accessibility: chatMessageBehavior,
    as: 'div',
    badgePosition: 'end',
    reactionGroupPosition: 'start',
  }

  public state = {
    focused: false,
    isFromKeyboard: false,
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys
    // as navigation (only Tab key should work)
    preventDefault: event => {
      event.preventDefault()
    },
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({
      focused: true,
      isFromKeyboard: isFromKeyboard(),
    })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleBlur = (e: React.FocusEvent) => {
    // `this.state.focused` controls is focused the whole `ChatMessage` or any of its children. When we're navigating
    // with keyboard the focused element will be changed and there is no way to use `:focus` selector
    const shouldPreserveFocusState = _.invoke(e, 'currentTarget.contains', e.relatedTarget)

    this.setState({ focused: shouldPreserveFocusState })
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    unhandledProps,
    styles,
  }: RenderResultConfig<ChatMessageProps>) {
    const {
      actionMenu,
      author,
      badge,
      badgePosition,
      children,
      content,
      timestamp,
      reactionGroup,
      reactionGroupPosition,
    } = this.props
    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root
    const badgeElement = Label.create(badge, {
      defaultProps: {
        className: ChatMessage.slotClassNames.badge,
        styles: styles.badge,
      },
    })

    const reactionGroupElement = Reaction.Group.create(reactionGroup, {
      defaultProps: {
        className: ChatMessage.slotClassNames.reactionGroup,
        styles: styles.reactionGroup,
      },
    })

    return (
      <ElementType
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        className={className}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
      >
        {childrenPropExists ? (
          children
        ) : (
          <>
            {Menu.create(actionMenu, {
              defaultProps: {
                [IS_FOCUSABLE_ATTRIBUTE]: true,
                accessibility: toolbarBehavior,
                className: ChatMessage.slotClassNames.actionMenu,
                styles: styles.actionMenu,
              },
            })}

            {badgePosition === 'start' && badgeElement}

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

            {reactionGroupPosition === 'start' && reactionGroupElement}

            {Box.create(content, {
              defaultProps: {
                className: ChatMessage.slotClassNames.content,
                styles: styles.content,
              },
            })}

            {reactionGroupPosition === 'end' && reactionGroupElement}

            {badgePosition === 'end' && badgeElement}
          </>
        )}
      </ElementType>
    )
  }
}

ChatMessage.create = createShorthandFactory({ Component: ChatMessage, mappedProp: 'content' })
ChatMessage.slotClassNames = {
  actionMenu: `${ChatMessage.className}__actions`,
  author: `${ChatMessage.className}__author`,
  timestamp: `${ChatMessage.className}__timestamp`,
  badge: `${ChatMessage.className}__badge`,
  content: `${ChatMessage.className}__content`,
  reactionGroup: `${ChatMessage.className}__reactions`,
}

export default ChatMessage
