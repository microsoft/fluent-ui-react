import * as React from 'react'

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
import Slot from '../Slot/Slot'
import ChatItemGutter from './ChatItemGutter'

export interface ChatItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /** Chat items can have a gutter. */
  gutter?: ShorthandValue
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
  }

  static defaultProps = {
    as: 'li',
  }

  renderComponent({ ElementType, classes, rest, styles }: RenderResultConfig<ChatItemProps>) {
    const { children, content, gutter } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {ChatItemGutter.create(gutter)}
            {Slot.create(content)}
          </>
        )}
      </ElementType>
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, 'content')

export default ChatItem
