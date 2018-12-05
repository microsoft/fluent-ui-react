import React from 'react'
import { Avatar, Chat, Divider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatExample = () => (
  <Chat>
    <Chat.Item
      mine
      content={{
        content: (
          <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
        ),
      }}
    />
    <Chat.Item
      gutter={{ content: <Avatar {...janeAvatar} /> }}
      content={<Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />}
    />
    <Chat.Item
      mine
      content={{
        content: (
          <Chat.Message
            content="Would you like to grab a lunch?"
            author="John Doe"
            timestamp="Yesterday, 10:16 PM"
            mine
          />
        ),
      }}
    />
    <Chat.Item
      gutter={{ content: <Avatar {...janeAvatar} /> }}
      content={{
        content: (
          <Chat.Message
            content="Sure! Let's try the new place downtown"
            author="Jane Doe"
            timestamp="Yesterday, 10:15 PM"
          />
        ),
      }}
    />
    <Chat.Item>
      <Divider content="Today" color="primary" important />
    </Chat.Item>
    <Chat.Item
      mine
      content={{
        content: (
          <Chat.Message
            content="Let's have a call"
            author="John Doe"
            timestamp="Today, 11:15 PM"
            mine
          />
        ),
      }}
    />
  </Chat>
)

export default ChatExample
