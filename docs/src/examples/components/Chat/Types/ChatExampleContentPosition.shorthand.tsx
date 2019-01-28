import * as React from 'react'
import { Avatar, Chat } from '@stardust-ui/react'

const [janeAvatar, johnAvatar] = [
  'public/images/avatar/small/ade.jpg',
  'public/images/avatar/small/joe.jpg',
].map(src => ({
  image: src,
  status: { color: 'green', icon: 'check' },
}))

const items = [
  {
    contentPosition: 'start',
    gutter: { content: <Avatar {...johnAvatar} /> },
    message: {
      content: <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" />,
    },
    key: 'message-id-1',
  },
  {
    contentPosition: 'end',
    gutter: { content: <Avatar {...janeAvatar} /> },
    message: {
      content: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" mine />,
    },
    key: 'message-id-2',
  },
]

const ChatExampleContentPosition = () => <Chat items={items} />

export default ChatExampleContentPosition
