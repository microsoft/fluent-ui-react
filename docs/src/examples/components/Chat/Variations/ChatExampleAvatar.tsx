import React from 'react'

import { Chat } from '@stardust-ui/react'

const ChatExampleAvatar = () => (
  <Chat>
    <Chat.Message mine avatar={{ src: 'public/images/avatar/small/matt.jpg', status: 'Available' }}>
      Hello
    </Chat.Message>

    <Chat.Message avatar={{ src: 'public/images/avatar/small/jenny.jpg', status: 'Busy' }}>
      Hi
    </Chat.Message>

    <Chat.Message mine avatar={{ src: 'public/images/avatar/small/matt.jpg', status: 'Available' }}>
      Let's go get some lunch!
    </Chat.Message>

    <Chat.Message avatar={{ src: 'public/images/avatar/small/jenny.jpg', status: 'Busy' }}>
      Sure thing. I was thinking we should try the new place downtown.
    </Chat.Message>
  </Chat>
)

export default ChatExampleAvatar
