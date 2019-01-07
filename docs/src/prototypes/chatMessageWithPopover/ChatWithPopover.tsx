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

            '&.popover-shown .actions': {
              opacity: 1,
            },
            '& a': {
              color: siteVariables.brand,
            },
          }),
        },
        ContextMenu: {
          root: ({ theme: { siteVariables } }) => ({
            background: siteVariables.white,
            boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)',
            borderRadius: '.3rem',
            marginTop: '5px',
          }),
        },
        Menu: {
          root: {
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
