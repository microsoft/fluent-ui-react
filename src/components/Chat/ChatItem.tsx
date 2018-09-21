import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  createShorthandFactory,
  customPropTypes,
  IRenderResultConfig,
  UIComponent,
} from '../../lib'
import {
  ComponentPartStyle,
  ComponentVariablesInput,
  IComponentPartStylesPrepared,
} from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import ChatBubble from './ChatBubble'
import ChatAction from './ChatAction'
import Divider from '../Divider/Divider'
import childrenExist from '../../lib/childrenExist'

export interface IChatItemProps {
  action?: ItemShorthand
  as?: any
  bubble?: ItemShorthand
  children?: ReactChildren
  className?: string
  divider?: ItemShorthand
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class ChatItem extends UIComponent<Extendable<IChatItemProps>, any> {
  static className = 'ui-chat__item'

  static create: Function

  static displayName = 'ChatItem'

  static propTypes = {
    as: customPropTypes.as,

    /** Shorthand for the bubble message. Note: this cannot be used with the action or divider prop at the same time. */
    bubble: customPropTypes.every([
      customPropTypes.disallow(['action', 'divider']),
      customPropTypes.itemShorthand,
    ]),

    /** Shorthand for the divider item. Note: this cannot be used with the bubble or action prop at the same time. */
    divider: customPropTypes.every([
      customPropTypes.disallow(['action', 'bubble']),
      customPropTypes.itemShorthand,
    ]),

    /** Shorthand for the control message item. Note: this cannot be used with the bubble or divider prop at the same time. */
    action: customPropTypes.every([
      customPropTypes.disallow(['bubble', 'divider']),
      customPropTypes.itemShorthand,
    ]),

    /** Child content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'action',
    'as',
    'bubble',
    'children',
    'className',
    'divider',
    'styles',
    'variables',
  ]

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
    const { children } = this.props

    return (
      <ElementType {...rest} className={cx(classes.root, classes.content)}>
        {childrenExist(children) ? { children } : this.renderMessage(styles, variables)}
      </ElementType>
    )
  }

  private renderMessage = (
    styles: IComponentPartStylesPrepared,
    variables: ComponentVariablesInput,
  ): React.ReactNode => {
    const { bubble, action, divider } = this.props

    return (
      (bubble &&
        ChatBubble.create(bubble, {
          defaultProps: {
            styles: styles.bubble,
            variables: variables.bubble,
          },
        })) ||
      (action &&
        ChatAction.create(action, {
          defaultProps: {
            styles: styles.action,
            variables: variables.action,
          },
        })) ||
      (divider &&
        Divider.create(divider, {
          defaultProps: {
            styles: styles.divider,
            variables: variables.divider,
          },
        }))
    )
  }
}

ChatItem.create = createShorthandFactory(ChatItem, content => ({ content }))

export default ChatItem
