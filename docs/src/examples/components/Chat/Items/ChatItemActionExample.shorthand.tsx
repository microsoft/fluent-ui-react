import React from 'react'

import { Chat, Text } from '@stardust-ui/react'

const items = [
  {
    key: 1,
    action: {
      icon: 'user plus',
      content: (
        <>
          <Text content="John Doe" weight="bold" /> has joined the conversation.
        </>
      ),
      timestamp: 'Today, 11:15 PM',
    },
  },
  {
    key: 2,
    action: {
      icon: { name: 'record', variables: { color: '#6264A7' } },
      content: 'Meeting started',
      timestamp: 'Today, 11:15 PM',
    },
  },
]

const ChatExampleShorthand = () => <Chat items={items} />

export default ChatExampleShorthand
