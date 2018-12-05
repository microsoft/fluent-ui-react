import React from 'react'
import { Avatar, Chat, Divider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const averageText = 'some average text'
const bigText =
  'some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text some big text '

const items = [
  {
    mine: true,
    content: {
      content: <Chat.Message content="hi" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />,
    },
    key: 'message-id-1',
  },
  {
    gutter: { content: <Avatar {...janeAvatar} /> },
    content: {
      content: <Chat.Message content="hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
    },
    key: 'message-id-2',
  },
  {
    mine: true,
    content: {
      content: (
        <Chat.Message
          content={averageText}
          author="John Doe"
          timestamp="Yesterday, 10:16 PM"
          mine
        />
      ),
    },
    key: 'message-id-3',
  },
  {
    gutter: {
      content: <Avatar {...janeAvatar} />,
    },
    content: {
      content: (
        <Chat.Message content={averageText} author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
      ),
    },
    key: 'message-id-4',
  },
  {
    content: <Divider content="Today" color="primary" important />,
    key: 'message-id-5',
  },
  {
    mine: true,
    content: {
      content: (
        <Chat.Message content={bigText} author="John Doe" timestamp="Today, 11:15 PM" mine />
      ),
    },
    key: 'message-id-6',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
