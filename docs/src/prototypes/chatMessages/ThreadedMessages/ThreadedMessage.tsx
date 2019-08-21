import * as React from 'react'
import { Chat, ChatMessageProps, Text, Flex, Button } from '@stardust-ui/react'
import threadedMessageBehavior from './threadedMessageBehavior'

interface ThreadedMessageProps extends ChatMessageProps {
  subject?: string
  items?: ChatMessageProps[]
}
class ThreadedMessage extends React.Component<ThreadedMessageProps> {
  renderContent = () => {
    const { subject, content } = this.props
    const subjectEl = subject ? <Text weight="semibold" size="large" content={subject} /> : null
    return (
      <Flex column>
        {subjectEl}
        {content}
      </Flex>
    )
  }

  renderMainMessageBody = () => {
    return (
      <Chat.Message
        className="ui-chat__message__thread-body"
        {...this.props}
        content={this.renderContent()}
      />
    )
  }

  renderCollapseAllOrRepliesButton = () => {
    return (
      <Button
        as="a"
        fluid
        accessibility={null}
        style={{ border: 'none', marginBottom: '1px', justifyContent: 'start', boxShadow: 'none' }}
      >
        <div className="screen-reader-text" role="heading" aria-level={5} />
        <div aria-hidden="true">2 replies from Joe and Jack</div>
      </Button>
    )
  }

  renderReplyButton = () => {
    return (
      <Button fluid style={{ border: 'none', justifyContent: 'start' }}>
        Reply
      </Button>
    )
  }

  render() {
    return (
      <Chat.Message
        className="ui-chat__message__thread"
        accessibility={threadedMessageBehavior}
        content={
          <Flex column>
            {this.renderMainMessageBody()}
            {this.renderCollapseAllOrRepliesButton()}
            {this.renderReplyButton()}
          </Flex>
        }
      />
    )
  }
}

export default ThreadedMessage
