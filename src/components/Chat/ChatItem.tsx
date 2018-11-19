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
  forwardRefFactory,
} from '../../lib'
import Slot from '../Slot/Slot'

export interface ChatItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {}

/**
 * A chat item represents a single event in a chat.
 */
class ChatItem extends UIComponent<Extendable<ChatItemProps>, any> {
  static className = 'ui-chat__item'

  static create: Function

  static displayName = 'ChatItem'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
  }

  static defaultProps = {
    as: 'li',
  }

  renderComponent({
    ElementType,
    classes,
    styles,
    variables,
    rest,
  }: RenderResultConfig<ChatItemProps>) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children)
          ? children
          : Slot.create(content, {
              styles: styles.content,
              variables: variables.content,
            })}
      </ElementType>
    )
  }
}

const ForwardedChatItem = forwardRefFactory(ChatItem)
ForwardedChatItem.create = createShorthandFactory(ForwardedChatItem, 'content')

export default ForwardedChatItem
