import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
  IRenderResultConfig,
  pxToRem,
} from '../../lib'
import {
  ComponentVariablesInput,
  IComponentPartStylesInput,
  ComponentPartStyle,
} from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import Avatar from '../Avatar'
import Layout from '../Layout'
import Text from '../Text'

export interface IChatMessageProps {
  as?: any
  author?: string
  avatar?: ItemShorthand
  children?: ReactChildren
  className?: string
  content?: any
  mine?: boolean
  styles?: IComponentPartStylesInput
  timestamp?: string
  variables?: ComponentVariablesInput
}

class ChatMessage extends UIComponent<Extendable<IChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    as: customPropTypes.as,

    /** Author of the message. */
    author: PropTypes.string,

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
    timestamp: PropTypes.string,

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
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
    as: 'li',
  }

  renderComponent({
    ElementType,
    classes,
    rest,
    styles,
    variables,
  }: IRenderResultConfig<IChatMessageProps>) {
    const { as, avatar, children, mine } = this.props

    return childrenExist(children) ? (
      <ElementType {...rest} className={cx(classes.root, classes.content)}>
        {children}
      </ElementType>
    ) : (
      <Layout
        as={as}
        {...rest}
        className={classes.root}
        start={!mine && this.renderAvatar(avatar, styles.avatar, variables)}
        main={this.renderContent(classes.content)}
        end={mine && this.renderAvatar(avatar, styles.avatar, variables)}
      />
    )
  }

  private renderContent = (contentClass: string) => {
    const { author, content, mine, timestamp } = this.props

    return (
      <Layout
        className={contentClass}
        vertical
        start={
          <>
            {!mine && author && this.renderText(author)}
            {timestamp && this.renderText(timestamp, true)}
          </>
        }
        main={content}
      />
    )
  }

  private renderText = (content: string, timestamp?: boolean) => (
    <Text
      timestamp={timestamp}
      content={content}
      size="sm"
      styles={{ root: { marginRight: pxToRem(10) } }}
    />
  )

  private renderAvatar = (
    avatar: ItemShorthand,
    avatarStyles: ComponentPartStyle,
    variables: ComponentVariablesInput,
  ) =>
    avatar &&
    Avatar.create(avatar, {
      defaultProps: {
        styles: { root: avatarStyles },
        variables: variables.avatar,
      },
    })
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
