import { Chat, Provider, Avatar } from '@stardust-ui/react'
import * as React from 'react'
import Popover from './Popover'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatWithPopover = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatMessage: {
          root: ({ props: p, theme: { siteVariables } }) => ({
            '& a': {
              color: siteVariables.colors.primary[500],
            },
          }),
        },
        Menu: {
          root: {
            background: '#fff',
            transition: 'opacity 0.2s',
            position: 'absolute',

            '& a:focus': {
              textDecoration: 'none',
              color: 'inherit',
            },
            '& a': {
              color: 'inherit',
            },

            '& .smile-emoji': {
              position: 'absolute',
              opacity: 0,
              zIndex: -1,
            },

            '&.focused .smile-emoji': {
              position: 'initial',
              zIndex: 'initial',
              opacity: 1,
            },

            '&:hover .smile-emoji': {
              position: 'initial',
              zIndex: 'initial',
              opacity: 1,
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
          message: {
            content: (
              <Chat.Message
                actionMenu={<Popover />}
                author="Jane Doe"
                content={{
                  content: (
                    <div>
                      <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                    </div>
                  ),
                }}
                timestamp="Yesterday, 10:15 PM"
              />
            ),
          },
          gutter: { content: <Avatar {...janeAvatar} /> },
        },
        {
          key: 'b',
          message: {
            content: (
              <Chat.Message
                actionMenu={<Popover />}
                author="Jane Doe"
                content={{
                  content: (
                    <div>
                      <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                    </div>
                  ),
                }}
                timestamp="Yesterday, 10:15 PM"
              />
            ),
          },
          gutter: { content: <Avatar {...janeAvatar} /> },
        },
        {
          key: 'c',
          message: {
            content: (
              <Chat.Message
                actionMenu={<Popover />}
                author="Jane Doe"
                content={{
                  content: (
                    <div>
                      <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                    </div>
                  ),
                }}
                timestamp="Yesterday, 10:15 PM"
              />
            ),
          },
          gutter: { content: <Avatar {...janeAvatar} /> },
        },
      ]}
    />
  </Provider>
)

export default ChatWithPopover
