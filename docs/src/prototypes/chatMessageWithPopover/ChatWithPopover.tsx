import { Chat, Provider, Avatar } from '@stardust-ui/react'
import * as React from 'react'
import ChatMessageWithPopover from './ChatMessageWithPopover'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatWithPopover = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatMessage: {
          root: ({ theme: { siteVariables } }) => ({
            position: 'relative',

            '&.focused .actions': {
              opacity: 1,
            },
            ':hover .actions': {
              opacity: 1,
            },
            '& a': {
              color: siteVariables.brand,
            },
          }),
        },
        Menu: {
          root: {
            background: '#fff',
            boxShadow: '0px 2px 4px #ddd',
            borderRadius: '.3rem',
            '& a:focus': {
              textDecoration: 'none',
              color: 'inherit',
            },
            '& a': {
              color: 'inherit',
            },
          },
        },
      },
    }}
  >
    <Chat
      items={[
        {
          key: 'a',
          message: { content: <ChatMessageWithPopover /> },
          gutter: { content: <Avatar {...janeAvatar} /> },
        },
        {
          key: 'b',
          message: { content: <ChatMessageWithPopover /> },
          gutter: { content: <Avatar {...janeAvatar} /> },
        },
        {
          key: 'c',
          message: { content: <ChatMessageWithPopover /> },
          gutter: { content: <Avatar {...janeAvatar} /> },
        },
      ]}
    />
  </Provider>
)

export default ChatWithPopover
