import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  IRenderResultConfig,
  UIComponent,
} from '../../lib'
import {
  ComponentPartStyle,
  ComponentVariablesInput,
  IComponentPartStylesInput,
} from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Avatar from '../Avatar'
import ChatMessageBehavior from '../../lib/accessibility/Behaviors/Chat/ChatMessageBehavior'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import Layout from '../Layout'
import Text from '../Text'

export interface IChatMessageProps {
  accessibility?: Accessibility
  as?: any
  author?: ItemShorthand
  avatar?: ItemShorthand
  children?: ReactChildren
  className?: string
  content?: any
  mine?: boolean
  styles?: ComponentPartStyle
  timestamp?: ItemShorthand
  variables?: ComponentVariablesInput
}

class ChatMessage extends UIComponent<Extendable<IChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Author of the message. */
    author: customPropTypes.itemShorthand,

    /** Chat messages can have an avatar. */
    avatar: customPropTypes.itemShorthand,

    /** Child content. */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.any,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Timestamp of the message. */
    timestamp: customPropTypes.itemShorthand,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    accessibility: ChatMessageBehavior as Accessibility,
    as: 'div',
  }

  actionHandlers: AccessibilityActionHandlers = {
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
  }: IRenderResultConfig<IChatMessageProps>) {
    const { avatar, children, mine } = this.props

    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root
    const content = childrenPropExists ? (
      children
    ) : (
      <Layout
        start={!mine && this.renderAvatar(avatar, styles.avatar, variables)}
        main={this.renderContent(classes.content, styles, variables)}
        end={mine && this.renderAvatar(avatar, styles.avatar, variables)}
      />
    )

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={className}
      >
        {content}
      </ElementType>
    )
  }

  private renderContent = (
    contentClass: string,
    styles: IComponentPartStylesInput,
    variables: ComponentVariablesInput,
  ) => {
    const { author, content, mine, timestamp } = this.props

    const authorComponent = Text.create(author, {
      defaultProps: {
        size: 'sm',
        styles: styles.author,
        variables: variables.author,
      },
    })

    const timestampComponent = Text.create(timestamp, {
      defaultProps: {
        size: 'sm',
        timestamp: true,
        styles: styles.timestamp,
        variables: variables.timestamp,
      },
    })

    return (
      <Layout
        className={contentClass}
        vertical
        start={
          <>
            {!mine && authorComponent}
            {timestampComponent}
          </>
        }
        main={content}
      />
    )
  }

  private renderAvatar = (
    avatar: ItemShorthand,
    avatarStyles: ComponentPartStyle,
    variables: ComponentVariablesInput,
  ) =>
    avatar &&
    Avatar.create(avatar, {
      defaultProps: {
        styles: avatarStyles,
        variables: variables.avatar,
      },
    })
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
