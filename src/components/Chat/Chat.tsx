import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'

export interface IChatProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  children?: ReactChildren
  messages?: ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class Chat extends UIComponent<Extendable<IChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Shorthand array of messages. */
    messages: PropTypes.arrayOf(PropTypes.any),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = { accessibility: ChatBehavior as Accessibility, as: 'ul' }

  static Message = ChatMessage

  actionHandlers: AccessibilityActionHandlers = {
    focus: event => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, messages } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
      >
        {childrenExist(children)
          ? children
          : _.map(messages, message => ChatMessage.create(message))}
      </ElementType>
    )
  }
}

export default Chat
