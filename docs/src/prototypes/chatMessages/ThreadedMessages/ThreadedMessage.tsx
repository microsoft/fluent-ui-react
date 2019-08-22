import * as React from 'react'
import { Chat, ChatMessageProps, Text, Flex, Attachment, AttachmentProps } from '@stardust-ui/react'
import threadedMessageBehavior from './threadedMessageBehavior'
import ThreadReplies, { ThreadReplyProps } from './ThreadReplies'
import ThreadReplyEditor from './ThreadReplyEditor'
import ScreenReaderHeaderText from './SreenReaderHeaderText'
import { actionMenu } from './mockData'

interface ThreadedMessageProps extends ChatMessageProps {
  subject?: string
  replies?: ThreadReplyProps[]
  meeting?: AttachmentProps
}
class ThreadedMessage extends React.Component<ThreadedMessageProps> {
  renderContent = () => {
    const { subject, content, author, timestamp, meeting } = this.props
    const subjectEl = subject ? <Text weight="semibold" size="large" content={subject} /> : null
    return (
      <div>
        <Flex column style={{ padding: '8px 16px' }}>
          <Flex>
            <Text size="small" content={author} styles={{ padding: '5px 5px 5px 0' }} />
            <Text
              size="small"
              content={timestamp}
              styles={{ padding: '5px', color: 'rgb(151, 149, 147)' }}
            />
          </Flex>
          {subjectEl}
          {content}
        </Flex>
        {meeting ? (
          <Attachment
            actionable
            icon="calendar"
            header={meeting.header}
            description={meeting.description}
            action={{
              icon: 'more',
            }}
          />
        ) : null}
      </div>
    )
  }

  renderMainMessageBody = () => {
    return (
      <Chat.Message
        className="ui-chat__message__thread-body"
        content={this.renderContent()}
        actionMenu={actionMenu}
      />
    )
  }

  render() {
    return (
      <>
        <ScreenReaderHeaderText
          level="4"
          text={this.props.content.toString()}
          author={this.props.author.toString()}
        />
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
      </>
    )
  }
}

export default ThreadedMessage
