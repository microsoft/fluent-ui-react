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
  rtlTextContainer,
} from '../../lib'
import Box from '../Box/Box'
import { ComponentSlotStylesPrepared } from '../../themes/types'

export interface ChatItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Controls item's relation to other chat items. */
  attached?: boolean | 'top' | 'bottom'

  /** Chat items can have a gutter. */
  gutter?: ShorthandValue

  /** Indicates whether the content is positioned at the start or the end. */
  contentPosition?: 'start' | 'end'

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
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
    gutter: customPropTypes.itemShorthand,
    contentPosition: PropTypes.oneOf(['start', 'end']),
    message: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'li',
    contentPosition: 'start',
    attached: false,
  }

  renderComponent({
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<ChatItemProps>) {
    const { children } = this.props

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderChatItem(styles)}
      </ElementType>
    )
  }

  private renderChatItem(styles: ComponentSlotStylesPrepared) {
    const { message, gutter, contentPosition } = this.props
    const gutterElement = gutter && Box.create(gutter, { defaultProps: { styles: styles.gutter } })

    return (
      <>
        {contentPosition === 'start' && gutterElement}
        {Box.create(message, { defaultProps: { styles: styles.message } })}
        {contentPosition === 'end' && gutterElement}
      </>
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, 'message')

export default ChatItem
