import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import Avatar from '../Avatar'

export interface IChatMessageProps {
  as?: any
  avatar?: ItemShorthand
  children?: ReactChildren
  className?: string
  content?: any
  mine?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class ChatMessage extends UIComponent<Extendable<IChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    as: customPropTypes.as,

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

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'avatar',
    'children',
    'className',
    'content',
    'mine',
    'styles',
    'variables',
  ]

  static defaultProps = {
    as: 'li',
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { avatar, children, content, mine } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {!mine && this.renderAvatar(avatar, styles)}
        <div className={classes.chatContent}>{childrenExist(children) ? children : content}</div>
        {mine && this.renderAvatar(avatar, styles)}
      </ElementType>
    )
  }

  private renderAvatar = (avatar: ItemShorthand, styles: IComponentPartStylesInput) =>
    avatar && Avatar.create(avatar, { defaultProps: { styles: { root: styles.chatAvatar } } })
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
