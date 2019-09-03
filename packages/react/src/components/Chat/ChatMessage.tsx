import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref } from '@stardust-ui/react-component-ref'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import * as _ from 'lodash'
import { Popper } from '../../lib/positioner'

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
  ShorthandFactory,
  WithExpectedProps,
} from '../../lib'
import {
  WithAsProp,
  ShorthandValue,
  ComponentEventHandler,
  withSafeTypeForAs,
  ShorthandCollection,
} from '../../types'
import { chatMessageBehavior, menuAsToolbarBehavior } from '../../lib/accessibility'
import { IS_FOCUSABLE_ATTRIBUTE } from '../../lib/accessibility/FocusZone'
import { Accessibility } from '../../lib/accessibility/types'

import Box, { BoxProps } from '../Box/Box'
import Label, { LabelProps } from '../Label/Label'
import Menu, { MenuProps } from '../Menu/Menu'
import Text, { TextProps } from '../Text/Text'
import Reaction, { ReactionProps } from '../Reaction/Reaction'
import { ReactionGroupProps } from '../Reaction/ReactionGroup'
import { MenuItemProps } from '@stardust-ui/react'
import { ComponentSlotStylesPrepared } from '../../themes/types'

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
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Menu with actions of the message. */
  actionMenu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>

  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom'

  /** Author of the message. */
  author?: ShorthandValue<TextProps>

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** Timestamp of the message. */
  timestamp?: ShorthandValue<TextProps>

  /** Badge attached to the message. */
  badge?: ShorthandValue<LabelProps>

  /** A message can format the badge to appear at the start or the end of the message. */
  badgePosition?: 'start' | 'end'

  /**
   * Called after user's blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<ChatMessageProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ChatMessageProps>

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue<ReactionGroupProps> | ShorthandCollection<ReactionProps>

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end'
}

export interface ChatMessageState {
  focused: boolean
  isFromKeyboard: boolean
  messageDomNode: HTMLElement
}

class ChatMessage extends UIComponent<WithAsProp<ChatMessageProps>, ChatMessageState> {
  static className = 'ui-chat__message'

  static create: ShorthandFactory<ChatMessageProps>

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

  updateActionsMenuPosition = () => {}

  state = {
    focused: false,
    isFromKeyboard: false,
    messageDomNode: null,
  }

  actionHandlers = {
    // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys
    // as navigation (only Tab key should work)
    preventDefault: event => {
      event.preventDefault()
    },

    focus: event => {
      if (this.state.messageDomNode) {
        this.state.messageDomNode.focus()
        event.stopPropagation()
      }
    },
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.updateActionsMenuPosition()

    this.setState({
      focused: true,
      isFromKeyboard: isFromKeyboard(),
    })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleBlur = (e: React.SyntheticEvent) => {
    // `this.state.focused` controls is focused the whole `ChatMessage` or any of its children. When we're navigating
    // with keyboard the focused element will be changed and there is no way to use `:focus` selector
    const shouldPreserveFocusState = _.invoke(e, 'currentTarget.contains', (e as any).relatedTarget)

    this.setState({ focused: shouldPreserveFocusState })
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  renderActionMenu(
    actionMenu: ChatMessageProps['actionMenu'],
    styles: ComponentSlotStylesPrepared,
  ) {
    const actionMenuElement = Menu.create(actionMenu, {
      defaultProps: {
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        accessibility: menuAsToolbarBehavior,
        className: ChatMessage.slotClassNames.actionMenu,
        styles: styles.actionMenu,
      } as WithExpectedProps<MenuProps>,
    })

    if (!actionMenuElement) {
      return actionMenuElement
    }

    return (
      <Popper unstable_pinned targetRef={this.state.messageDomNode} position="above" align="end">
        {({ scheduleUpdate }) => {
          this.updateActionsMenuPosition = scheduleUpdate
          return actionMenuElement
        }}
      </Popper>
    )
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

    const actionMenuElement = this.renderActionMenu(actionMenu, styles)

    const authorElement = Text.create(author, {
      defaultProps: {
        size: 'small',
        styles: styles.author,
        className: ChatMessage.slotClassNames.author,
      },
    })

    const timestampElement = Text.create(timestamp, {
      defaultProps: {
        size: 'small',
        styles: styles.timestamp,
        timestamp: true,
        className: ChatMessage.slotClassNames.timestamp,
      },
    })

    const messageContent = Box.create(content, {
      defaultProps: {
        className: ChatMessage.slotClassNames.content,
        styles: styles.content,
      },
    })

    return (
      <Ref
        innerRef={domNode => {
          domNode !== this.state.messageDomNode && this.setState({ messageDomNode: domNode })
        }}
      >
        <ElementType
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseEnter={() => this.updateActionsMenuPosition()}
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
              {actionMenuElement}
              {badgePosition === 'start' && badgeElement}
              {authorElement}
              {timestampElement}
              {reactionGroupPosition === 'start' && reactionGroupElement}
              {messageContent}
              {reactionGroupPosition === 'end' && reactionGroupElement}
              {badgePosition === 'end' && badgeElement}
            </>
          )}
        </ElementType>
      </Ref>
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

/**
 * A ChatMessage represents a single message in chat.
 */
export default withSafeTypeForAs<typeof ChatMessage, ChatMessageProps>(ChatMessage)
