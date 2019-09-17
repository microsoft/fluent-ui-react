import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import {
  childrenExist,
  createShorthandFactory,
  RenderResultConfig,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'

import ChatItemGutter, { ChatGutterProps } from './ChatGutter'
import ChatMessage, { ChatMessageProps } from './ChatMessage'

export interface ChatItemProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Controls item's relation to other chat items. */
  attached?: boolean | 'top' | 'bottom'

  /** Chat items can have a gutter. */
  gutter?: ShorthandValue<ChatGutterProps>

  /** Indicates whether the content is positioned at the start or the end. */
  contentPosition?: 'start' | 'end'

  /** Chat items can have a message. */
  message?: ShorthandValue<ChatMessageProps>
}

class ChatItem extends UIComponent<WithAsProp<ChatItemProps>, any> {
  static className = 'ui-chat__item'
  static create: ShorthandFactory<ChatItemProps>
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
    accessibility,
    ElementType,
    classes,
    unhandledProps,
    styles,
  }: RenderResultConfig<ChatItemProps>) {
    const { attached, contentPosition, children, gutter, message } = this.props
    const gutterElement = ChatItemGutter.create(gutter, {
      defaultProps: { attached, position: contentPosition },
    })

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {contentPosition === 'start' && gutterElement}
            {ChatMessage.create(message, {
              defaultProps: { attached, position: contentPosition },
            })}
            {contentPosition === 'end' && gutterElement}
          </>
        )}
      </ElementType>
    )
  }
}

ChatItem.create = createShorthandFactory({ Component: ChatItem, mappedProp: 'message' })

/**
 * A ChatItem is container for single entity in Chat (e.g. message, notification, etc).
 */
export default withSafeTypeForAs<typeof ChatItem, ChatItemProps, 'li'>(ChatItem)
