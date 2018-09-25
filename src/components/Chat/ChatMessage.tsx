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
  ICSSInJSStyle,
} from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Avatar from '../Avatar'
import Layout from '../Layout'
import Text from '../Text'

export interface IChatMessageProps {
  as?: any
  author?: ItemShorthand
  avatar?: ItemShorthand
  avatarStyle?: ICSSInJSStyle
  children?: ReactChildren
  className?: string
  content?: any
  contentStyle?: ICSSInJSStyle
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
    as: customPropTypes.as,

    /** Author of the message. */
    author: customPropTypes.itemShorthand,

    /** Chat messages can have an avatar. */
    avatar: customPropTypes.itemShorthand,

    /** Style for the avatar of the ChatMessage. */
    avatarStyle: PropTypes.object,

    /** Child content. */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.any,

    /** Style for the content of the ChatMessage. */
    contentStyle: PropTypes.object,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Timestamp of the message. */
    timestamp: customPropTypes.itemShorthand,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'author',
    'avatar',
    'avatarStyle',
    'children',
    'className',
    'content',
    'contentStyle',
    'mine',
    'styles',
    'timestamp',
    'variables',
  ]

  static defaultProps = {
    as: 'div',
  }

  renderComponent({
    ElementType,
    classes,
    rest,
    styles,
    variables,
  }: IRenderResultConfig<IChatMessageProps>) {
    const { as, avatar, children, mine, mainStyle, avatarStyle } = this.props

    return childrenExist(children) ? (
      <ElementType {...rest} className={cx(classes.root, classes.content)}>
        {children}
      </ElementType>
    ) : (
      <Layout
        as={as}
        {...rest}
        className={classes.root}
        start={!mine && this.renderAvatar(avatar, styles.avatar, variables, avatarStyle)}
        main={this.renderContent(classes.content, styles, variables, mainStyle)}
        end={mine && this.renderAvatar(avatar, styles.avatar, variables, avatarStyle)}
      />
    )
  }

  private renderContent = (
    contentClass: string,
    styles: IComponentPartStylesInput,
    variables: ComponentVariablesInput,
    mainStyle,
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
        rootCSS={mainStyle}
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
    avatarStyle: ICSSInJSStyle,
  ) =>
    avatar &&
    Avatar.create(avatar, {
      defaultProps: {
        styles: { ...avatarStyles, ...avatarStyle },
        variables: variables.avatar,
      },
    })
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
