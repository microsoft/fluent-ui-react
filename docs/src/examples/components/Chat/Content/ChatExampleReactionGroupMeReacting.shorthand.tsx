import * as React from 'react'
import { Avatar, Chat, ChatItemProps, ShorthandCollection } from '@stardust-ui/react'

const items: ShorthandCollection<ChatItemProps> = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: {
      reactionGroup: [
        {
          icon: 'like',
          content: '1K',
          key: 'likes',
          variables: { meReacting: true },
          as: 'button',
        },
        { icon: 'emoji', content: 2, key: 'smiles', as: 'button' },
      ],
      content: 'Hello',
      author: 'John Doe',
      timestamp: 'Yesterday, 10:15 PM',
      mine: true,
    },
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: {
      reactionGroup: [
        {
          icon: 'like',
          content: '1K',
          key: 'likes',
          variables: { meReacting: true },
          as: 'button',
        },
        { icon: 'emoji', content: 2, key: 'smiles', as: 'button' },
      ],
      reactionGroupPosition: 'end',
      content: "I'm back!",
      author: 'John Doe',
      timestamp: 'Yesterday, 10:15 PM',
      mine: true,
    },
  },
  {
    gutter: <Avatar image="public/images/avatar/small/ade.jpg" />,
    message: {
      reactionGroup: [
        {
          icon: 'like',
          content: '1K',
          key: 'likes',
          variables: { meReacting: true },
          as: 'button',
        },
        { icon: 'emoji', content: 2, key: 'smiles', as: 'button' },
      ],
      content: 'Hi',
      author: 'Jane Doe',
      timestamp: 'Yesterday, 10:15 PM',
    },
    key: 'message-3',
  },
]

const MessageReactionsWithPopup = () => <Chat items={items} />

export default MessageReactionsWithPopup
