import React from 'react'
import { Chat } from '@stardust-ui/react'

const availableStatus = { color: 'green', icon: 'check', title: 'Available' }
const busyStatus = { color: 'red', title: 'Busy' }

const messages = [
  {
    key: 1,
    author: 'Matt Doe',
    timestamp: 'Yesterday, 10:15 PM',
    content: 'Hello',
    mine: true,
    avatar: { image: 'public/images/avatar/small/matt.jpg', status: availableStatus },
  },
  {
    key: 2,
    author: 'Jenny Doe',
    timestamp: 'Yesterday, 10:17 PM',
    content: 'Hi',
    avatar: { image: 'public/images/avatar/small/jenny.jpg', status: busyStatus },
  },
  {
    key: 3,
    author: 'Matt Doe',
    timestamp: 'Yesterday, 10:18 PM',
    content: "Let's go get some lunch!",
    mine: true,
    avatar: { image: 'public/images/avatar/small/matt.jpg', status: availableStatus },
  },
  {
    key: 4,
    author: 'Jenny Doe',
    timestamp: 'Yesterday, 10:20 PM',
    content: 'Sure thing. I was thinking we should try the new place downtown.',
    avatar: { image: 'public/images/avatar/small/jenny.jpg', status: busyStatus },
  },
]

const ChatExampleAvatar = () => <Chat messages={messages} />

export default ChatExampleAvatar
