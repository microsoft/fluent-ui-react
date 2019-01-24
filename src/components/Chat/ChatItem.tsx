import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'

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
  rtlTextContainer,
} from '../../lib'
import Box from '../Box/Box'
import { ComponentSlotStylesPrepared } from '../../themes/types'

export interface ChatItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Indicates whether the ChatItem is part of a batch. */
  grouped?: boolean

  /** Chat items can have a gutter. */
  gutter?: ShorthandValue

  /** Indicates whether the gutter is positioned at the start or the end. */
  gutterPosition?: 'start' | 'end'

  /** Chat items can have a message. */
  message?: ShorthandValue
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
    grouped: PropTypes.bool,
    gutter: customPropTypes.itemShorthand,
    gutterPosition: PropTypes.oneOf(['start', 'end']),
    message: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'li',
    gutterPosition: 'start',
  }

  renderComponent({
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<ChatItemProps>) {
    const { children, grouped } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={grouped ? cx(classes.root, `${ChatItem.className}-grouped`) : classes.root}
      >
        {childrenExist(children) ? children : this.renderChatItem(styles)}
      </ElementType>
    )
  }

  private renderChatItem(styles: ComponentSlotStylesPrepared) {
    const { message, gutter, gutterPosition } = this.props
    const gutterElement =
      gutter &&
      Box.create(gutter, {
        defaultProps: { styles: styles.gutter, className: `${ChatItem.className}__gutter` },
      })

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
