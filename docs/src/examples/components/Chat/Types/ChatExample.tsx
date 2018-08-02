import React from 'react'

import { Chat } from '@stardust-ui/react'

const ChatExample = () => (
  <Chat>
    <Chat.Message mine author="John Doe" timestamp="Yesterday, 10:15 PM">
      Hello
    </Chat.Message>

    <Chat.Message author="Jane Doe" timestamp="Yesterday, 10:15 PM">
      Hi
    </Chat.Message>

    <Chat.Message mine author="John Doe" timestamp="Yesterday, 10:15 PM">
      Let's go get some lunch!
    </Chat.Message>

    <Chat.Message author="Jane Doe" timestamp="Yesterday, 10:15 PM">
      Sure thing. I was thinking we should try the new place downtown. he name of its chief promises
      a delicious food being offered.
    </Chat.Message>
  </Chat>
)

export default ChatExample
