import * as React from 'react'
import { Avatar, Chat } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const items = [
  {
    message: {
      content: (
        <Chat.Message
          content="Hi, can we talk? It's important!"
          author="John Doe"
          timestamp="Yesterday, 10:15 PM"
          mine
          badge={{
            icon: 'exclamation',
            color: 'red',
          }}
          badgePosition="start"
        />
      ),
    },
    contentPosition: 'end',
    key: 'message-id-1',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: (
        <Chat.Message
          content="Sure @John. Let's schedule a meeting."
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
          badge={{
            icon: 'at',
            color: 'red',
          }}
        />
      ),
    },
    attached: 'top',
    key: 'message-id-4',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
