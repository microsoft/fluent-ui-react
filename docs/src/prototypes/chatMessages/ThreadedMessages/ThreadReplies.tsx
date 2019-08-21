import * as React from 'react'
import * as _ from 'lodash'
import {
  AvatarProps,
  ChatMessageProps,
  Button,
  ChatItem,
  ChatItemProps,
  Chat,
} from '@stardust-ui/react'
import repliesButtonBehavior from './repliesButtonBehavior'

export type ThreadReplyProps = ChatMessageProps & {
  avatar?: AvatarProps
}

type ThreadRepliesProps = {
  replies?: ThreadReplyProps[]
}

const ThreadReplies = (props: ThreadRepliesProps) => {
  const [expanded, setExpanded] = React.useState(false)

  const renderCollapseAllOrRepliesButton = () => {
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
        fluid
        accessibility={repliesButtonBehavior}
        style={{ border: 'none', marginBottom: '1px', justifyContent: 'start', boxShadow: 'none' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="screen-reader-text" role="heading" aria-level={5} />
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
      }
      const chatItemProps: ChatItemProps = {
        gutter: {
          content: reply.avatar,
          className: 'ui-chat__item__reply__gutter',
        },
        message: <Chat.Message {...messageProps} />,
        className: 'ui-chat__item__reply',
      }
      return <ChatItem as="div" {...chatItemProps} key={`reply-message-id-${index}`} />
    })
  }

  return (
    <>
      {renderCollapseAllOrRepliesButton()}
      {renderReplies()}
    </>
  )
}
// class ThreadReplies extends React.Component<ThreadRepliesProps> {
//   renderCollapseAllOrRepliesButton = () => {
//     return (
//       <Button
//         as="a"
//         fluid
//         accessibility={null}
//         style={{ border: 'none', marginBottom: '1px', justifyContent: 'start', boxShadow: 'none' }}
//       >
//         <div className="screen-reader-text" role="heading" aria-level={5} />
//         <div aria-hidden="true">2 replies from Joe and Jack</div>
//       </Button>
//     )
//   }

//   render() {
//     return <>{this.renderCollapseAllOrRepliesButton()}</>
//   }
// }

export default ThreadReplies
