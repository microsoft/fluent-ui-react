import React from 'react'

import { Chat } from '@stardust-ui/react'

const messages = [
  { key: 1, content: 'Hello', author: 'John Doe', timestamp: 'Yesterday, 10:15 PM', mine: true },
  { key: 2, content: 'Hi', author: 'Jane Doe', timestamp: 'Yesterday, 10:15 PM' },
  {
    key: 3,
    content: "Let's go get some lunch!",
    author: 'John Doe',
    timestamp: 'Yesterday, 10:15 PM',
    mine: true,
  },
  {
    key: 4,
    content:
      'Sure thing.  I was thinking we should try the new place downtown. The name of its chief promises a delicious food being offered.',
    author: 'Jane Doe',
    timestamp: 'Yesterday, 10:15 PM',
  },
]

const ChatExampleShorthand = () => <Chat messages={messages} />

export default ChatExampleShorthand
