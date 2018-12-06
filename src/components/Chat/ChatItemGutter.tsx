import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  createShorthandFactory,
} from '../../lib'
import { Extendable, ShorthandValue } from '../../../types/utils'
import Slot from '../Slot/Slot'

export interface ChatItemGutterProps
  extends UIComponentProps<ChatItemGutterProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue> {
  /** Indicates whether message belongs to the current user. */
}

/**
 * A gutter is used to create the auxiliary area of a chat item
 */
class ChatItemGutter extends UIComponent<Extendable<ChatItemGutterProps>, any> {
  static className = 'ui-chat__item__gutter'
  static create: Function
  static displayName = 'ChatItemGutter'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : Slot.create(content)}
      </ElementType>
    )
  }
}

ChatItemGutter.create = createShorthandFactory(ChatItemGutter, 'content')

export default ChatItemGutter
