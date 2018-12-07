import { Chat, Provider } from '@stardust-ui/react'
import * as React from 'react'
import ChatMessageWithPopover from './ChatMessageWithPopover'

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
        { key: 'a', content: <ChatMessageWithPopover /> },
        { key: 'b', content: <ChatMessageWithPopover /> },
        { key: 'c', content: <ChatMessageWithPopover /> },
      ]}
    />
  </Provider>
)

export default ChatWithPopover
