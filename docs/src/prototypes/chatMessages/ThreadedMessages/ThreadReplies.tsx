import * as React from 'react'
import * as _ from 'lodash'
import {
  AvatarProps,
  Avatar,
  ChatMessageProps,
  Button,
  ChatItem,
  ChatItemProps,
  Chat,
} from '@stardust-ui/react'
import repliesButtonBehavior from './repliesButtonBehavior'
import ScreenReaderHeaderText from './SreenReaderHeaderText'

export type ThreadReplyProps = ChatMessageProps & {
  avatar?: AvatarProps
}

type ThreadRepliesProps = {
  replies?: ThreadReplyProps[]
}

const ThreadReplies: React.FC<ThreadRepliesProps> = props => {
  const [expanded, setExpanded] = React.useState(false)

  const renderTriggerButton = () => {
    const { replies } = props
    if (!replies) {
      return null
    }

    const repliesCount = replies.length

    if (repliesCount === 0 || repliesCount === 1) {
      return null
    }

    const authorName1 = replies[0].author
    const authorName2 = replies[1].author
    const remainReplies = repliesCount - 2
    const moreRepliesLeft = remainReplies > 0
    const buttonText = expanded
      ? 'Collapse all'
      : `${repliesCount} replies from ${authorName1} and ${authorName2}${
          moreRepliesLeft ? `, and ${remainReplies} others` : ''
        }`

    return (
      <Button
        as="a"
        className={`${Button.className}__reply`}
        fluid
        accessibility={repliesButtonBehavior}
        onClick={() => setExpanded(!expanded)}
      >
        <ScreenReaderHeaderText level="5" text={buttonText} />
        <div aria-hidden="true">{buttonText}</div>
      </Button>
    )
  }

  const renderReplies = () => {
    const { replies } = props
    if (!replies || replies.length === 0 || !expanded) {
      return null
    }

    return _.map(replies, (reply, index) => {
      const messageProps: ChatMessageProps = {
        content: reply.content,
        author: reply.author,
        timestamp: reply.timestamp,
        actionMenu: reply.actionMenu,
        className: 'ui-chat__message__reply',
      }
      const chatItemProps: ChatItemProps = {
        gutter: {
          content: <Avatar {...reply.avatar} />,
          className: 'ui-chat__item__reply__gutter',
        },
        message: {
          content: (
            <>
              <ScreenReaderHeaderText
                level="5"
                text={messageProps.content.toString()}
                author={messageProps.author.toString()}
              />
              <Chat.Message {...messageProps} />
            </>
          ),
          className: 'ui-chat__item__message-reply',
        },
        className: 'ui-chat__item__reply',
      }
      return <ChatItem as="div" {...chatItemProps} key={`reply-message-id-${index}`} />
    })
  }

  return (
    <>
      {renderTriggerButton()}
      {renderReplies()}
    </>
  )
}

export default ThreadReplies
