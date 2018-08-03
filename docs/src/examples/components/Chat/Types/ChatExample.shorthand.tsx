import React from 'react'

import { Button, Chat } from '@stardust-ui/react'

const messages = [
  {
    key: 1,
    content: (
      <>
        <Button type="primary" content="Pizza" data-is-focusable="true" />
        <Button type="secondary" content="Burger" data-is-focusable="true" />
        <br />
        <span>
          Link: <a href="#">Hello #1</a>
          <br />Other link: <a href="#">Hello #2</a>
        </span>
      </>
    ),
    mine: true,
  },
  { key: 2, content: 'Hi' },
  { key: 3, content: "Let's go get some lunch!", mine: true },
  { key: 4, content: 'Sure thing.  I was thinking we should try the new place downtown.' },
]

const ChatExampleShorthand = () => <Chat messages={messages} />

export default ChatExampleShorthand
