import React from 'react'

import { Chat } from '@stardust-ui/react'

const messages = [
  {
    key: 1,
    content: 'Hello',
    mine: true,
    avatar: { src: 'public/images/avatar/small/matt.jpg', status: 'Available' },
  },
  {
    key: 2,
    content: 'Hi',
    avatar: { src: 'public/images/avatar/small/jenny.jpg', status: 'Busy' },
  },
  {
    key: 3,
    content: "Let's go get some lunch!",
    mine: true,
    avatar: { src: 'public/images/avatar/small/matt.jpg', status: 'Available' },
  },
  {
    key: 4,
    content: 'Sure thing. I was thinking we should try the new place downtown.',
    avatar: { src: 'public/images/avatar/small/jenny.jpg', status: 'Busy' },
  },
]

const ChatExampleAvatar = () => <Chat messages={messages} />

export default ChatExampleAvatar
