import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Extendable, ShorthandValue } from '../../../types/utils'
import {
  childrenExist,
  createShorthandFactory,
  RenderResultConfig,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  customPropTypes,
} from '../../lib'
import { ComponentSlotStylesPrepared } from 'src/themes/types'
import Slot from '../Slot/Slot'
import ChatItemGutter from './ChatItemGutter'

export interface ChatItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /** Chat items can have a gutter. */
  gutter?: ShorthandValue

  /** Indicates whether message belongs to the current user. */
  mine?: boolean
}

/**
 * A chat item represents a single event in a chat.
 */
class ChatItem extends UIComponent<Extendable<ChatItemProps>, any> {
  static className = 'ui-chat__item'
  static create: Function
  static displayName = 'ChatItem'
  static Gutter = ChatItemGutter

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    gutter: customPropTypes.itemShorthand,
    mine: PropTypes.bool,
  }

  static defaultProps = {
    as: 'li',
  }

  renderComponent({ ElementType, classes, rest, styles }: RenderResultConfig<ChatItemProps>) {
    const { children } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderChatItem(styles)}
      </ElementType>
    )
  }

  private renderChatItem(styles: ComponentSlotStylesPrepared) {
    const { content, gutter, mine } = this.props
    const gutterElement = ChatItemGutter.create(gutter, { defaultProps: { mine } })

    return (
      <>
        {!mine && gutterElement}
        {Slot.create(content)}
        {mine && gutterElement}
      </>
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, 'content')

export default ChatItem
