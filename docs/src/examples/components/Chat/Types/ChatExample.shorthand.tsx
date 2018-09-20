import React from 'react'

import { Chat } from '@stardust-ui/react'

const janeAvatar = {
  src: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
    title: 'Available',
  },
}

const items = [
  {
    key: 1,
    bubble: { content: 'Hello', author: 'John Doe', timestamp: 'Yesterday, 10:15 PM', mine: true },
  },
  {
    key: 2,
    bubble: {
      content: 'Hi',
      author: 'Jane Doe',
      timestamp: 'Yesterday, 10:15 PM',
      avatar: janeAvatar,
    },
  },
  {
    key: 3,
    bubble: {
      content: 'Would you like to grab a lunch?',
      author: 'John Doe',
      timestamp: 'Yesterday, 10:16 PM',
      mine: true,
    },
  },
  {
    key: 4,
    bubble: {
      content: "Sure! Let's try the new place downtown",
      author: 'Jane Doe',
      timestamp: 'Yesterday, 10:16 PM',
      avatar: janeAvatar,
    },
  },
  { key: 5, divider: { content: 'Today', type: 'primary', important: 'true' } },
  {
    key: 6,
    bubble: {
      content: "Let's have a call",
      author: 'John Doe',
      timestamp: 'Today, 11:15 PM',
      mine: true,
    },
  },
  {
    key: 7,
    action: { icon: 'record', content: 'Meeting started', timestamp: "'Today, 11:15 PM'" },
  },
]

const ChatExampleShorthand = () => <Chat items={items} />

export default ChatExampleShorthand
