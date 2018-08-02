import * as React from 'react'
import PropTypes from 'prop-types'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  pxToRem,
  UIComponent,
} from '../../lib'

import { Text, Header, Layout } from '../../'

import chatMessageRules from './chatMessageRules'
import chatMessageVariables from './chatMessageVariables'

class ChatMessage extends UIComponent<any, any> {
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

    /** Author of the message. */
    author: PropTypes.string,

    /** Timestamp of the message. */
    timestamp: PropTypes.string,

    /** Indicates whether message belongs to the current user. */
    mine: PropTypes.bool,
  }

  static handledProps = ['as', 'author', 'children', 'className', 'content', 'mine', 'timestamp']

  static defaultProps = {
    as: 'li',
  }

  static rules = chatMessageRules

  static variables = chatMessageVariables

  renderContent() {
    const { author, content, timestamp } = this.props
    const timestampStyle = {
      paddingLeft: timestamp ? pxToRem(10) : undefined,
    }
    const Timestamp = <Text timestamp content={timestamp} style={timestampStyle} />
    const MessageHeader = <Header as="h5" content={author} />
    return (
      <React.Fragment>
        <Layout main={MessageHeader} end={Timestamp} />
        <Text content={content} />
      </React.Fragment>
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

ChatMessage.create = createShorthandFactory(ChatMessage, content => ({ content }))

export default ChatMessage
