import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatItem from './ChatItem'
import ChatMessage from './ChatMessage'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import { chatBehavior } from '../../lib/accessibility'

export interface IChatProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  children?: ReactChildren
  items?: ShorthandValue[]
  renderItem?: ShorthandRenderFunction
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class Chat extends UIComponent<Extendable<IChatProps>, any> {
  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Shorthand array of the items inside the chat. */
    items: PropTypes.arrayOf(customPropTypes.itemShorthand),

    /**
     * A custom render iterator for rendering each of the Chat items.
     * The default component, props, and children are available for each item.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderItem: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = { accessibility: chatBehavior as Accessibility, as: 'ul' }

  static Item = ChatItem
  static Message = ChatMessage

  actionHandlers: AccessibilityActionHandlers = {
    focus: event => this.focusZone && this.focusZone.focus(),
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, items, renderItem } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
      >
        {childrenExist(children)
          ? children
          : _.map(items, item => ChatItem.create(item, { render: renderItem }))}
      </ElementType>
    )
  }
}

export default Chat
