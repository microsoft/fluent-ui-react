import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  createShorthandFactory,
  customPropTypes,
  IRenderResultConfig,
  UIComponent,
} from '../../lib'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'
import { Extendable, ReactChildren } from '../../../types/utils'
import childrenExist from '../../lib/childrenExist'

export interface IChatItemProps {
  as?: any
  content?: React.ReactNode
  children?: ReactChildren
  className?: string
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class ChatItem extends UIComponent<Extendable<IChatItemProps>, any> {
  static className = 'ui-chat__item'

  static create: Function

  static displayName = 'ChatItem'

  static propTypes = {
    as: customPropTypes.as,

    /** Child content. */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply. */
    className: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = ['as', 'children', 'className', 'styles', 'variables']

  static defaultProps = {
    as: 'li',
  }

  renderComponent({
    ElementType,
    classes,
    rest,
    styles,
    variables,
  }: IRenderResultConfig<IChatItemProps>) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={cx(classes.root, classes.content)}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, content => ({ content }))

export default ChatItem
