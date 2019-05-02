import { Avatar, Chat } from '@stardust-ui/react'
import * as React from 'react'

const reactions = [
  { key: 'up', icon: 'thumbs up', content: '1K' },
  { key: 'down', icon: 'thumbs down', content: 5 },
]

const items = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: {
      content: (
        <Chat.Message
          reactionGroup={reactions}
          content="Hello"
          author="John Doe"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      ),
    },
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: {
      content: (
        <Chat.Message
          reactionGroup={[{ key: 'up', icon: 'thumbs up', content: '8' }]}
          content="I'm back!"
          author="John Doe"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      ),
    },
  },
  {
    gutter: { content: <Avatar image="public/images/avatar/small/ade.jpg" /> },
    message: {
      content: (
        <Chat.Message
          reactionGroup={reactions}
          content="Hi"
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    key: 'message-3',
  },
]

const ChatExampleReactionGroup = () => <Chat items={items} />

export default ChatExampleReactionGroup
