import * as React from 'react'
import { Chat, ChatMessageProps, Text, Flex, Attachment, AttachmentProps } from '@stardust-ui/react'
import threadedMessageBehavior from './threadedMessageBehavior'
import ThreadReplies, { ThreadReplyProps } from './ThreadReplies'
import ThreadReplyEditor from './ThreadReplyEditor'
import ScreenReaderHeaderText from './ScreenReaderHeaderText'
import { actionMenu } from './mockData'
import classNames from './classNames'

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
        <Flex className={classNames.threadedMessage.innerContent} column>
          <Flex>
            <Text size="small" className={classNames.threadedMessage.author} content={author} />
            <Text
              size="small"
              className={classNames.threadedMessage.timestamp}
              content={timestamp}
            />
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
          className={classNames.threadedMessage.thread}
          accessibility={threadedMessageBehavior}
          content={
            <Flex column>
              <Chat.Message
                className={classNames.threadedMessage.threadBody}
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
