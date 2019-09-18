import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@stardust-ui/react'
import * as React from 'react'

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: {
      reactionGroup: [
        { key: 'up', icon: 'like', content: '1K' },
        { key: 'smile', icon: 'emoji', content: 5 },
      ],
      content: 'Hello',
      author: 'John Doe',
      timestamp: 'Yesterday, 10:15 PM',
      mine: true,
    },
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: {
      reactionGroup: [{ key: 'up', icon: 'like', content: '8' }],
      content: "I'm back!",
      author: 'John Doe',
      timestamp: 'Yesterday, 10:15 PM',
      mine: true,
    },
  },
  {
    gutter: <Avatar image="public/images/avatar/small/ade.jpg" />,
    message: {
      reactionGroup: [
        { key: 'up', icon: 'like', content: '1K' },
        { key: 'smile', icon: 'emoji', content: 5 },
      ],
      content: 'Hi',
      author: 'Jane Doe',
      timestamp: 'Yesterday, 10:15 PM',
    },
    key: 'message-3',
  },
]

const ChatExampleReactionGroup = () => <Chat items={items} />

export default ChatExampleReactionGroup
