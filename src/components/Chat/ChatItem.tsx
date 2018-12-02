import * as React from 'react'

import { childrenExist, createShorthandFactory, RenderResultConfig, UIComponent } from '../../lib'
import Slot from '../Slot/Slot'
import { Extendable } from '../../../types/utils'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface ChatItemProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentComponentProps {}

/**
 * A chat item represents a single event in a chat.
 */
class ChatItem extends UIComponent<Extendable<ChatItemProps>, any> {
  static className = 'ui-chat__item'

  static create: Function

  static displayName = 'ChatItem'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
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

ChatItem.create = createShorthandFactory(ChatItem, 'content')

export default ChatItem
