import {
  Chat,
  Provider,
  Avatar,
  toolbarButtonBehavior,
  Accessibility,
  toolbarBehavior,
} from '@stardust-ui/react'
import * as React from 'react'

const popoverBehavior: Accessibility = (props: any) => {
  const behavior = toolbarBehavior(props)

  behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
    return root.querySelector('[aria-label="thumbs up"]')
  }

  return behavior
}
const actionMenu = {
  accessibility: popoverBehavior,
  iconOnly: true,
  items: [
    {
      key: 'smile',
      icon: 'smile',
      className: 'smile-emoji',
      accessibility: toolbarButtonBehavior,
      'aria-label': 'smile one',
    },
    {
      key: 'smile2',
      icon: 'smile',
      className: 'smile-emoji',
      accessibility: toolbarButtonBehavior,
      'aria-label': 'smile two',
    },
    {
      key: 'smile3',
      icon: 'smile',
      className: 'smile-emoji',
      accessibility: toolbarButtonBehavior,
      'aria-label': 'smile three',
    },
    {
      key: 'a',
      icon: 'thumbs up',
      accessibility: toolbarButtonBehavior,
      'aria-label': 'thumbs up',
    },
    {
      key: 'c',
      icon: 'ellipsis horizontal',
      accessibility: toolbarButtonBehavior,
      'aria-label': 'more options',
      indicator: false,
      menu: {
        pills: true,
        items: [
          { key: 'bookmark', icon: 'folder', content: 'Save this message' },
          { key: 'linkify', icon: 'linkify', content: 'Copy link' },
          { key: 'translate', icon: 'translate', content: 'Translate' },
        ],
      },
    },
  ],
}

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
              color: siteVariables.brand,
            },

            '& .smile-emoji': {
              position: 'absolute',
              opacity: 0,
              zIndex: -1,
            },

            '&:hover .smile-emoji': {
              position: 'inherit',
              opacity: 1,
              zIndex: 'initial',
            },
            ...(p.focused && {
              '& .smile-emoji': {
                position: 'inherit',
                opacity: 1,
                zIndex: 'initial',
              },
            }),
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
                actionMenu={actionMenu}
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
                actionMenu={actionMenu}
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
                actionMenu={actionMenu}
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
