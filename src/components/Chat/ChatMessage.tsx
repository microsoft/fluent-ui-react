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
  IComponentPartClasses,
  IComponentPartStylesInput,
} from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import Avatar from '../Avatar'
import { chatMessageBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import Text from '../Text'
import Slot from '../Slot/Slot'

export interface IChatMessageProps {
  accessibility?: Accessibility
  as?: any
  author?: ShorthandValue
  avatar?: ShorthandValue
  children?: ReactChildren
  className?: string
  content?: any
  mine?: boolean
  renderAuthor?: ShorthandRenderFunction
  renderAvatar?: ShorthandRenderFunction
  renderTimestamp?: ShorthandRenderFunction
  styles?: ComponentPartStyle
  timestamp?: ShorthandValue
  variables?: ComponentVariablesInput
}

class ChatMessage extends UIComponent<Extendable<IChatMessageProps>, any> {
  static className = 'ui-chat__message'

  static create: Function

  static displayName = 'ChatMessage'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Author of the message. */
    author: customPropTypes.itemShorthand,

    /** Chat messages can have an avatar. */
    avatar: customPropTypes.itemShorthand,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for the primary content. */
    content: PropTypes.any,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,

    /**
     * A custom render function the author slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderAuthor: PropTypes.func,

    /**
     * A custom render function the avatar slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderAvatar: PropTypes.func,

    /**
     * A custom render function the timestamp slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderTimestamp: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Timestamp of the message. */
    timestamp: customPropTypes.itemShorthand,

    template: PropTypes.string,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    accessibility: chatMessageBehavior as Accessibility,
    as: 'div',
    template: [
      'author   timestamp  edited', //
      'content  content    content', //
    ],
  }

  actionHandlers: AccessibilityActionHandlers = {
    // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys as navigation (only Tab key should work)
    preventDefault: event => {
      event.preventDefault()
    },
  }

  renderComponent({
    ElementType,
    classes,
    accessibility,
    rest,
    styles,
    variables,
  }: IRenderResultConfig<IChatMessageProps>) {
    const {
      author,
      avatar,
      content,
      children,
      // mine,
      renderAuthor,
      renderAvatar,
      renderTimestamp,
      timestamp,
      template,
    } = this.props

    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root

    const rootProps = {
      ...accessibility.attributes.root,
      ...accessibility.keyHandlers.root,
      ...rest,
      className,
    }

    if (childrenPropExists) {
      return <ElementType {...rootProps}>{children}</ElementType>
    }

    const enabledAreas = {} as any
    const gridTemplateAreas = []
      .concat(template)
      .filter(Boolean)
      .reduce((acc, next) => {
        // remove areas for which there is no prop
        return (
          acc +
          ' "' +
          next
            .replace(/['"]/g, '')
            .split(' ')
            .filter(area => {
              enabledAreas[area] = true
              const exists = Boolean(this.props[area])
              console.log(area, exists)
              return exists
            })
            .join(' ') +
          '"'
        )
      }, '')

    console.log(gridTemplateAreas)

    return (
      <ElementType {...rootProps} style={{ gridTemplateAreas }}>
        {enabledAreas.avatar &&
          Avatar.create(avatar, {
            defaultProps: {
              styles: styles.avatar,
              variables: variables.avatar,
            },
            render: renderAvatar,
          })}
        {enabledAreas.author &&
          Text.create(author, {
            defaultProps: {
              size: 'small',
              styles: styles.author,
              variables: variables.author,
            },
            render: renderAuthor,
          })}
        {enabledAreas.timestamp &&
          Text.create(timestamp, {
            defaultProps: {
              size: 'small',
              timestamp: true,
              styles: styles.timestamp,
              variables: variables.timestamp,
            },
            render: renderTimestamp,
          })}
        {/* TODO add Message.Content and separate avatar */}
        {enabledAreas.content &&
          Slot.create(content, {
            defaultProps: {
              styles: styles.content,
              variables: variables.content,
            },
          })}
      </ElementType>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
