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
import Layout from '../Layout'
import Text from '../Text'
import Attachment from '../Attachment'
import Button from '../Button'
import Popup from '../Popup'
import Menu from '../Menu'

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
  }: IRenderResultConfig<IChatMessageProps>) {
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
        {childrenPropExists ? children : this.renderContent(classes, styles, variables)}
      </ElementType>
    )
  }

  renderContent = (
    classes: IComponentPartClasses,
    styles: IComponentPartStylesInput,
    variables: ComponentVariablesInput,
  ) => {
    const {
      author,
      avatar,
      content,
      mine,
      renderAuthor,
      renderAvatar,
      renderTimestamp,
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

    const menu = (
      <Menu
        defaultActiveIndex={0}
        items={[
          { key: 'editorials', content: 'Editorials' },
          { key: 'review', content: 'Reviews' },
          { key: 'events', content: 'Upcoming Events' },
        ]}
        vertical
      />
    )

    const actionPopup = (
      <Popup trigger={<Button iconOnly icon="ellipsis horizontal" />} content={{ content: menu }} />
    )

    return (
      <Layout
        start={!mine && avatarElement}
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
            main={
              <>
                {content}
                <a href="/"> Some link </a>
                {content}
                <br />
                <br />
                <Attachment
                  icon="file word outline"
                  header="MeetingNotes.pptx"
                  action={{ icon: 'ellipsis horizontal' }}
                  renderAction={() => actionPopup}
                  data-is-focusable={true}
                />
                <Attachment
                  icon="file word outline"
                  header="Document.docx"
                  action={{ icon: 'ellipsis horizontal' }}
                  renderAction={() => actionPopup}
                  data-is-focusable={true}
                />
              </>
            }
          />
        }
        end={mine && avatarElement}
      />
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
