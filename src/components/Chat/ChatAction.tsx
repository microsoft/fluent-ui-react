import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  IRenderResultConfig,
  UIComponent,
} from '../../lib'
import {
  ComponentPartStyle,
  ComponentVariablesInput,
  IComponentPartStylesInput,
} from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'
import Layout from '../Layout'
import Text from '../Text'
import Icon from '../Icon'

export interface IChatActionProps {
  as?: any
  icon?: ItemShorthand
  children?: ReactChildren
  className?: string
  content?: any
  styles?: ComponentPartStyle
  timestamp?: ItemShorthand
  variables?: ComponentVariablesInput
}

class ChatAction extends UIComponent<Extendable<IChatActionProps>, any> {
  static className = 'ui-chat__action'

  static create: Function

  static displayName = 'ChatAction'

  static propTypes = {
    as: customPropTypes.as,

    /** Control chat messages can have an icon */
    icon: customPropTypes.itemShorthand,

    /** Child content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.any,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Timestamp of the message. */
    timestamp: customPropTypes.itemShorthand,

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'children',
    'className',
    'content',
    'icon',
    'styles',
    'timestamp',
    'variables',
  ]

  static defaultProps = {
    as: 'div',
  }

  renderComponent({
    ElementType,
    classes,
    rest,
    styles,
    variables,
  }: IRenderResultConfig<IChatActionProps>) {
    const { as, icon, children } = this.props

    return childrenExist(children) ? (
      <ElementType {...rest} className={cx(classes.root, classes.content)}>
        {children}
      </ElementType>
    ) : (
      <Layout
        as={as}
        {...rest}
        className={classes.root}
        start={Icon.create(icon, {
          defaultProps: { styles: styles.icon, variables: variables.icon },
        })}
        main={this.renderContent(classes.content, styles, variables)}
      />
    )
  }

  private renderContent = (
    contentClass: string,
    styles: IComponentPartStylesInput,
    variables: ComponentVariablesInput,
  ) => {
    const { content, timestamp } = this.props

    const timestampComponent = Text.create(timestamp, {
      defaultProps: {
        size: 'sm',
        timestamp: true,
        styles: styles.timestamp,
        variables: variables.timestamp,
      },
    })

    return (
      <>
        {content}
        {timestampComponent}
      </>
    )
  }
}

ChatAction.create = createShorthandFactory(ChatAction, content => ({ content }))

export default ChatAction
