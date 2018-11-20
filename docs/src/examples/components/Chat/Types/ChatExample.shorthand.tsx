import React from 'react'
import { Chat, Divider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const content = (
  <div>
    Sure! Let's try one of these places:<br />
    <a href="#">www.goodFood1.com</a>,<br />
    <a href="#">www.goodFood2.com</a> or<br />
    <a href="#">www.goodFood3.com</a>
  </div>
)

const items = [
  <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />,
  <Chat.Message
    content="Hi"
    author="Jane Doe"
    timestamp="Yesterday, 10:15 PM"
    avatar={janeAvatar}
  />,
  <Chat.Message
    content="Would you like to grab a lunch?"
    author="John Doe"
    timestamp="Yesterday, 10:16 PM"
    mine
  />,
  <Chat.Message
    content={{ content }}
    author="Jane Doe"
    timestamp="Yesterday, 10:15 PM"
    avatar={janeAvatar}
  />,
  <Divider content="Today" type="primary" important />,
  <Chat.Message content="Let's have a call" author="John Doe" timestamp="Today, 11:15 PM" mine />,
].map((chatItemContent, index) => ({
  key: `chat-item-${index}`,
  content: chatItemContent,
}))

const ChatExample = () => <Chat items={items} />

export default ChatExample
