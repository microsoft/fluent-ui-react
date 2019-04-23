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
            icon: 'redbang',
          }}
          badgePosition="start"
          variables={{ isImportant: true }}
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
            icon: 'mention',
          }}
          variables={{ hasMention: true }}
        />
      ),
    },
    attached: 'top',
    key: 'message-id-2',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
