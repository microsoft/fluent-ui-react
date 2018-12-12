import React from 'react'
import { Avatar, Chat } from '@stardust-ui/react'

const [janeAvatar, johnAvatar] = [
  'public/images/avatar/small/ade.jpg',
  'public/images/avatar/small/joe.jpg',
].map(src => ({
  image: src,
  status: { color: 'green', icon: 'check' },
}))

const ChatExampleGutterPosition = () => (
  <Chat>
    <Chat.Item
      gutterPosition="start"
      gutter={
        <Chat.Gutter>
          <Avatar {...johnAvatar} />
        </Chat.Gutter>
      }
      content={<Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" />}
    />
    <Chat.Item
      gutterPosition="end"
      gutter={
        <Chat.Gutter>
          <Avatar {...janeAvatar} />
        </Chat.Gutter>
      }
      content={<Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" mine />}
    />
  </Chat>
)

export default ChatExampleGutterPosition
