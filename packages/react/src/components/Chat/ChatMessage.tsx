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
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
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

import Label, { LabelProps } from '../Label/Label'
import Menu, { MenuProps } from '../Menu/Menu'
import Reaction, { ReactionProps } from '../Reaction/Reaction'
import { ReactionGroupProps } from '../Reaction/ReactionGroup'
import { MenuItemProps } from '@stardust-ui/react'
import { ComponentSlotStylesPrepared } from '../../themes/types'
import ChatAuthor, { ChatAuthorProps } from './ChatAuthor'
import ChatTimestamp, { ChatTimestampProps } from './ChatTimestamp'
import ChatContent, { ChatContentProps } from './ChatContent'

export interface ChatMessageSlotClassNames {
  actionMenu: string
  badge: string
  reactionGroup: string
}

export interface ChatMessageProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<ChatContentProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Menu with actions of the message. */
  actionMenu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>

  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom'

  /** Author of the message. */
  author?: ShorthandValue<ChatAuthorProps>

  /** Indicates whether message belongs to the current user. */
  mine?: boolean

  /** Timestamp of the message. */
  timestamp?: ShorthandValue<ChatTimestampProps>

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

  /**
   * Called after user enters by mouse.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter?: ComponentEventHandler<ChatMessageProps>

  /** Indicates whether the content is positioned at the start or the end. */
  position?: 'start' | 'end'

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue<ReactionGroupProps> | ShorthandCollection<ReactionProps>

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end'
}

export interface ChatMessageState {
  focused: boolean
  messageDomNode: HTMLElement
}

class ChatMessage extends UIComponent<WithAsProp<ChatMessageProps>, ChatMessageState> {
  static className = 'ui-chat__message'

  static create: ShorthandFactory<ChatMessageProps>

  static slotClassNames: ChatMessageSlotClassNames

  static displayName = 'ChatMessage'

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
    onMouseEnter: PropTypes.func,
    position: PropTypes.oneOf(['start', 'end']),
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

    this.setState({ focused: true })
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleBlur = (e: React.SyntheticEvent) => {
    // `this.state.focused` controls is focused the whole `ChatMessage` or any of its children. When we're navigating
    // with keyboard the focused element will be changed and there is no way to use `:focus` selector
    const shouldPreserveFocusState = _.invoke(e, 'currentTarget.contains', (e as any).relatedTarget)

    this.setState({ focused: shouldPreserveFocusState })
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleMouseEnter = (e: React.SyntheticEvent) => {
    this.updateActionsMenuPosition()
    _.invoke(this.props, 'onMouseEnter', e, this.props)
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
      },
    })

    if (!actionMenuElement) {
      return actionMenuElement
    }

    return (
      <Popper
        align="end"
        modifiers={{
          // https://popper.js.org/popper-documentation.html#modifiers..flip.behavior
          // Forces to flip only in "top-*" positions
          flip: { behavior: ['top'] },
          preventOverflow: {
            escapeWithReference: false,
            // https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.priority
            // Forces to stop prevent overflow on bottom and bottom
            priority: ['left', 'right'],
          },
        }}
        position="above"
        targetRef={this.state.messageDomNode}
      >
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
      attached,
      author,
      badge,
      badgePosition,
      children,
      content,
      mine,
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

    return (
      <Ref
        innerRef={domNode => {
          domNode !== this.state.messageDomNode && this.setState({ messageDomNode: domNode })
        }}
      >
        <ElementType
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseEnter={this.handleMouseEnter}
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
              {ChatAuthor.create(author, {
                defaultProps: {
                  attached,
                  mine,
                },
              })}
              {ChatTimestamp.create(timestamp, {
                defaultProps: {
                  attached,
                  mine,
                  hasReactionGroup: !_.isNil(reactionGroup),
                },
              })}
              {reactionGroupPosition === 'start' && reactionGroupElement}
              {ChatContent.create(content, {
                defaultProps: {
                  badgePosition,
                  hasBadge: !_.isNil(badge),
                  mine,
                },
              })}
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
  badge: `${ChatMessage.className}__badge`,
  reactionGroup: `${ChatMessage.className}__reactions`,
}

/**
 * A ChatMessage represents a single message in chat.
 */
export default withSafeTypeForAs<typeof ChatMessage, ChatMessageProps>(ChatMessage)
