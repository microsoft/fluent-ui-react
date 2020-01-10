import { Avatar, Chat, ChatItemProps, ReactionProps, ShorthandCollection } from '@fluentui/react'
import * as React from 'react'

const reactions: ShorthandCollection<ReactionProps> = [
  { key: 'up', icon: 'like', content: '1K' },
  { key: 'smile', icon: 'emoji', content: 5 },
]

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: (
      <Chat.Message
        reactionGroup={reactions}
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
        reactionGroup={[{ key: 'up', icon: 'like', content: '8' }]}
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

const ChatExampleReactionGroup = () => <Chat items={items} />

export default ChatExampleReactionGroup
