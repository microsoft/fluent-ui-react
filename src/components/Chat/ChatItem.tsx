import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  RenderResultConfig,
  UIComponent,
} from '../../lib'
import Slot from '../Slot/Slot'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import { Extendable, ReactChildren, ShorthandRenderFunction } from '../../../types/utils'

export interface ChatItemProps {
  as?: any
  content?: React.ReactNode
  children?: ReactChildren
  className?: string
  renderContent?: ShorthandRenderFunction
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A chat item represents a single event in a chat.
 */
class ChatItem extends UIComponent<Extendable<ChatItemProps>, any> {
  static className = 'ui-chat__item'

  static create: Function

  static displayName = 'ChatItem'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Child content. */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply. */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.node,

    /**
     * A custom render function the content slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderContent: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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
    const { children, content, renderContent } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children)
          ? children
          : Slot.create(content, {
              styles: styles.content,
              variables: variables.content,
              render: renderContent,
            })}
      </ElementType>
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, content => ({ content }))

export default ChatItem
