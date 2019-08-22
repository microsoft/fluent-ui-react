import * as React from 'react'
import { Chat, ChatMessageProps, Text, Flex } from '@stardust-ui/react'
import threadedMessageBehavior from './threadedMessageBehavior'
import ThreadReplies, { ThreadReplyProps } from './ThreadReplies'
import ThreadReplyEditor from './ThreadReplyEditor'
import { actionMenu } from './mockData'

interface ThreadedMessageProps extends ChatMessageProps {
  subject?: string
  replies?: ThreadReplyProps[]
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
        actionMenu={actionMenu}
      />
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
            <ThreadReplies replies={this.props.replies} />
            <ThreadReplyEditor />
          </Flex>
        }
      />
    )
  }
}

export default ThreadedMessage
