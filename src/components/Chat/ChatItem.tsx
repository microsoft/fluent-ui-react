import * as React from 'react'
import * as PropTypes from 'prop-types'

import { ReactProps, ShorthandValue } from '../../../types/utils'
import {
  childrenExist,
  createShorthandFactory,
  RenderResultConfig,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  customPropTypes,
} from '../../lib'
import Box from '../Box/Box'
import { ComponentSlotStylesPrepared } from '../../themes/types'
import { childrenDependentRtlAttributes } from '../../lib/rtl'
import { RtlFunc } from '../../lib/rtl/types'

export interface ChatItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Chat items can have a gutter. */
  gutter?: ShorthandValue

  /** Indicates whether the gutter is positioned at the start or the end. */
  gutterPosition?: 'start' | 'end'

  /** Chat items can have a message. */
  message?: ShorthandValue

  /**
   * Rtl attributes function if overridden by the user.
   * @default childrenDependentRtlAttributes
   */
  rtlAttributes?: RtlFunc
}

/**
 * A chat item represents a single event in a chat.
 */
class ChatItem extends UIComponent<ReactProps<ChatItemProps>, any> {
  static className = 'ui-chat__item'
  static create: Function
  static displayName = 'ChatItem'

  static propTypes = {
    ...commonPropTypes.createCommon({ content: false }),
    gutter: customPropTypes.itemShorthand,
    gutterPosition: PropTypes.oneOf(['start', 'end']),
    message: customPropTypes.itemShorthand,
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'li',
    gutterPosition: 'start',
    rtlAttributes: childrenDependentRtlAttributes,
  }

  renderComponent({
    ElementType,
    classes,
    unhandledProps,
    styles,
    rtlAttributes,
  }: RenderResultConfig<ChatItemProps>) {
    const { children } = this.props

    return (
      <ElementType {...rtlAttributes.root} {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : this.renderChatItem(styles)}
      </ElementType>
    )
  }

  private renderChatItem(styles: ComponentSlotStylesPrepared) {
    const { message, gutter, gutterPosition } = this.props
    const gutterElement = gutter && Box.create(gutter, { defaultProps: { styles: styles.gutter } })

    return (
      <>
        {gutterPosition === 'start' && gutterElement}
        {Box.create(message, { defaultProps: { styles: styles.message } })}
        {gutterPosition === 'end' && gutterElement}
      </>
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, 'message')

export default ChatItem
