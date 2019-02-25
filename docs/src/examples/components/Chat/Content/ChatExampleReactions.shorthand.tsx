import { Avatar, Chat } from '@stardust-ui/react'
import * as React from 'react'

const reactions = [
  {
    icon: 'thumbs up',
    count: 5,
  },
  {
    icon: 'thumbs down',
    count: '1K',
  },
]

const items = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: {
      content: (
        <Chat.Message
          reactions={reactions}
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
          reactions={[{ icon: 'thumbs up', count: '8' }]}
          reactionsPosition={'end'}
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
          reactions={reactions}
          content="Hi"
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    key: 'message-3',
  },
]

const ChatExampleReactions = () => <Chat items={items} />

export default ChatExampleReactions
