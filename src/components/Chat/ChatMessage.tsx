import * as React from 'react'
import * as PropTypes from 'prop-types'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface IChatMessageProps {
  as?: any
  children?: ReactChildren
  className?: string
  content?: any
  mine?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

import ChatMessageBehavior from '../../lib/accessibility/Behaviors/Chat/ChatMessageBehavior'
import { Accessibility, AccessibilityActions } from '../../lib/accessibility/interfaces'

class ChatMessage extends UIComponent<Extendable<IChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    as: customPropTypes.as,

    /** Child content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.string,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'children',
    'className',
    'content',
    'mine',
    'styles',
    'variables',
  ]

  static defaultProps = {
    accessibility: ChatMessageBehavior as Accessibility,
    as: 'div',
  }

  onComponentDidMount() {
    this.setState({
      wrapInFocusZone: true,
    })
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, content } = this.props

    console.error('ElementType', ElementType)

    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
