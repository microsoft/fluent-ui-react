import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  RenderResultConfig,
  UIComponent,
} from '../../lib'
import {
  ComponentSlotStyle,
  ComponentVariablesInput,
  ComponentSlotClasses,
  ComponentSlotStylesInput,
} from '../../themes/types'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import Avatar from '../Avatar/Avatar'
import { chatMessageBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers, AccessibilityBehavior } from '../../lib/accessibility/types'
import Layout from '../Layout/Layout'
import Text from '../Text/Text'
import Slot from '../Slot/Slot'

export interface ChatMessageProps {
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
  renderContent?: ShorthandRenderFunction
  renderTimestamp?: ShorthandRenderFunction
  styles?: ComponentSlotStyle
  timestamp?: ShorthandValue
  variables?: ComponentVariablesInput
}

class ChatMessage extends UIComponent<Extendable<ChatMessageProps>, any> {
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
     * A custom render function the content slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderContent: PropTypes.func,

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

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    accessibility: chatMessageBehavior as Accessibility,
    as: 'div',
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
  }: RenderResultConfig<ChatMessageProps>) {
    const { children } = this.props

    const childrenPropExists = childrenExist(children)
    const className = childrenPropExists ? cx(classes.root, classes.content) : classes.root

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={className}
      >
        {childrenPropExists ? children : this.renderContent(classes, styles, variables, accessibility)}
      </ElementType>
    )
  }

  renderContent = (
    classes: ComponentSlotClasses,
    styles: ComponentSlotStylesInput,
    variables: ComponentVariablesInput,
    accessibility: AccessibilityBehavior,
  ) => {
    const {
      author,
      avatar,
      content,
      mine,
      renderAuthor,
      renderAvatar,
      renderTimestamp,
      renderContent,
      timestamp,
    } = this.props

    const avatarElement = Avatar.create(avatar, {
      defaultProps: {
        styles: styles.avatar,
        variables: variables.avatar,
      },
      render: renderAvatar,
    })

    const authorElement = Text.create(author, {
      defaultProps: {
        size: 'small',
        styles: styles.author,
        variables: variables.author,
      },
      render: renderAuthor,
    })

    const timestampElement = Text.create(timestamp, {
      defaultProps: {
        size: 'small',
        timestamp: true,
        styles: styles.timestamp,
        variables: variables.timestamp,
      },
      render: renderTimestamp,
    })

    const contentElement = Slot.create(content, {
      styles: styles.content,
      variables: variables.content,
      render: renderContent,
      tabIndex: 0,
    })

    const renderMainArea = ({ main, classes }) => {
      return main &&  <div className={cx('ui-layout__main chat-message-layout', classes.main)}>{main}</div>
    }

    return (
      <Layout
        start={!mine && avatarElement}
        renderMainArea={renderMainArea}
        main={
            <Layout
              className={classes.content}
              vertical
              start={
                <>
                  {!mine && authorElement}
                  {timestampElement}
                </>
              }
              main={contentElement}
            />
        }
        end={mine && avatarElement}
      />
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
