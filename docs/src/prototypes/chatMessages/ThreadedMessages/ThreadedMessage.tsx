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
    return (
      <div>
        <Flex className="ui-chat__message__content-inner" column>
          <Flex>
            <Text size="small" className="ui-chat__message__author-inner" content={author} />
            <Text size="small" className="ui-chat__message__timestamp-inner" content={timestamp} />
          </Flex>
          {subject && <Text weight="semibold" size="large" content={subject} />}
          {content}
        </Flex>
        {meeting && (
          <Attachment
            actionable
            icon="calendar"
            header={meeting.header}
            description={meeting.description}
            action={{
              icon: 'more',
            }}
          />
        )}
      </div>
    )
  }

  render() {
    const { author, content, replies } = this.props
    const authorString = author.toString()
    const messageString = content.toString()

    return (
      <>
        <ScreenReaderHeaderText level="4" text={authorString} author={messageString} />
        <Chat.Message
          className="ui-chat__message__thread"
          accessibility={threadedMessageBehavior}
          content={
            <Flex column>
              <Chat.Message
                className="ui-chat__message__thread-body"
                content={this.renderContent()}
                actionMenu={actionMenu}
              />
              <ThreadReplies replies={replies} />
              <ThreadReplyEditor />
            </Flex>
          }
        />
      </>
    )
  }
}

export default ThreadedMessage
