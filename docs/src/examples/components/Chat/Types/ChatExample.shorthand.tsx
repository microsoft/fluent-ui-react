import * as React from 'react'
import { Avatar, Chat, Divider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const items = [
  {
    message: {
      content: (
        <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
      ),
    },
    key: 'message-id-1',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
    },
    key: 'message-id-2',
  },
  {
    message: { content: <Chat.Message content="What's up?" /> },
    key: 'message-id-3',
  },
  {
    message: {
      content: (
        <Chat.Message
          content="Would you like to grab a lunch?"
          author="John Doe"
          timestamp="Yesterday, 10:16 PM"
          mine
        />
      ),
    },
    key: 'message-id-4',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: (
        <Chat.Message
          content="Sure! Let's try the new place downtown"
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    key: 'message-id-5',
  },
  {
    children: <Divider content="Today" color="primary" important />,
    key: 'message-id-6',
  },
  {
    message: {
      content: (
        <Chat.Message
          content="Let's have a call"
          author="John Doe"
          timestamp="Today, 11:15 PM"
          mine
        />
      ),
    },
    key: 'message-id-7',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
