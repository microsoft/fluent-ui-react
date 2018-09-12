import React from 'react'
import { Chat } from '@stardust-ui/react'

const availableStatus = { color: 'green', icon: 'check', title: 'Available' }
const busyStatus = { color: 'red', title: 'Busy' }

const messages = [
  {
    key: 1,
    content: 'Hello',
    mine: true,
    avatar: { src: 'public/images/avatar/small/matt.jpg', status: availableStatus },
  },
  {
    key: 2,
    content: 'Hi',
    avatar: { src: 'public/images/avatar/small/jenny.jpg', status: busyStatus },
  },
  {
    key: 3,
    content: "Let's go get some lunch!",
    mine: true,
    avatar: { src: 'public/images/avatar/small/matt.jpg', status: availableStatus },
  },
  {
    key: 4,
    content: 'Sure thing. I was thinking we should try the new place downtown.',
    avatar: { src: 'public/images/avatar/small/jenny.jpg', status: busyStatus },
  },
]

const ChatExampleAvatar = () => <Chat messages={messages} />

export default ChatExampleAvatar
