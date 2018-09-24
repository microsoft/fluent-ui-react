import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
  IRenderResultConfig,
} from '../../lib'
import {
  ComponentVariablesInput,
  ComponentPartStyle,
  IComponentPartStylesInput,
} from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import Avatar from '../Avatar'
import ChatMessageBehavior from '../../lib/accessibility/Behaviors/Chat/ChatMessageBehavior'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import Layout from '../Layout'
import Text from '../Text'
import Menu from '../Menu'
import Popup from '../Popup'
import Button from '../Button'

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

    as: customPropTypes.as,

    /** Author of the message. */
    author: customPropTypes.itemShorthand,

    /** Chat messages can have an avatar */
    avatar: customPropTypes.itemShorthand,

    /** Child content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.any,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Timestamp of the message. */
    timestamp: customPropTypes.itemShorthand,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'author',
    'avatar',
    'children',
    'className',
    'content',
    'mine',
    'styles',
    'timestamp',
    'variables',
  ]

  static defaultProps = {
    accessibility: ChatMessageBehavior as Accessibility,
    as: 'li',
  }

  actionHandlers: AccessibilityActionHandlers = {
    // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys as navigation (only Tab key should work)
    preventDefault: event => {
      event.preventDefault()
    },
  }

  private renderToolbar(): React.ReactNode {
    const items: any[] = ['compose', 'attach', 'smile', 'picture'].map((icon, index) =>
      this.getMenuItem(icon, index),
    )

    // items.splice(-1, 0, { key: 'separator', styles: { flex: 1 } })

    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        iconOnly
        aria-label="Compose Editor"
        styles={{ marginTop: '10px' }}
      />
    )
  }

  private getMenuItem(name: string, index: number): any {
    return {
      key: `${index}-${name}`,
      icon: {
        name,
        xSpacing: 'both',
        variables: siteVars => ({ color: siteVars.gray02 }),
      },
      'aria-label': `${name} tool`,
    }
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    rest,
    styles,
    variables,
  }: IRenderResultConfig<IChatMessageProps>) {
    const { as, avatar, children, mine } = this.props
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

    console.log('content', content)

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

    const items = [
      { key: 'editorials', content: 'Editorials' },
      { key: 'review', content: 'Reviews' },
      { key: 'events', content: 'Upcoming Events' },
    ]

    const menuButton = (
      <Popup
        basic
        trigger={<Button icon="expand" />}
        content={<Menu vertical defaultActiveIndex={0} items={items} />}
      />
    )
    const emojiPopup = (
      <Popup basic trigger={<Button icon="smile" />} content={this.renderToolbar()} />
    )

    return (
      <Popup
        align="end"
        trigger={
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
        }
        content={
          <div>
            {menuButton}
            {emojiPopup}
          </div>
        }
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
