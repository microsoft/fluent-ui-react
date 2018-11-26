import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, RenderResultConfig, UIComponent } from '../../lib'
import Slot from '../Slot/Slot'
import { Extendable, ShorthandRenderFunction } from '../../../types/utils'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentShorthandComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentShorthandComponentPropsTypes,
} from '../../lib/commonPropTypes'

export interface ChatItemProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentShorthandComponentProps {
  /**
   * A custom render function the content slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderContent?: ShorthandRenderFunction
}

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
    ...contentShorthandComponentPropsTypes,
    renderContent: PropTypes.func,
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

ChatItem.create = createShorthandFactory(ChatItem, 'content')

export default ChatItem
