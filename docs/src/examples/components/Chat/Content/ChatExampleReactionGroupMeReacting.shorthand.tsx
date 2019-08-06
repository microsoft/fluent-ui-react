import * as React from 'react'
import { Avatar, Chat, ChatItemProps, ReactionProps, ShorthandCollection } from '@stardust-ui/react'

const reactions: ShorthandCollection<ReactionProps> = [
  { icon: 'like', content: '1K', key: 'likes', variables: { meReacting: true }, as: 'button' },
  { icon: 'thumbs down', content: 2, key: 'dislikes', as: 'button' },
]

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        reactionGroup={{
          items: reactions,
        }}
        content="Hello"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: (
      <Chat.Message
        reactionGroup={reactions}
        reactionGroupPosition="end"
        content="I'm back!"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
  },
  {
    gutter: <Avatar image="public/images/avatar/small/ade.jpg" />,
    message: (
      <Chat.Message
        reactionGroup={reactions}
        content="Hi"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
      />
    ),
    key: 'message-3',
  },
]

const MessageReactionsWithPopup = () => <Chat items={items} />

export default MessageReactionsWithPopup
