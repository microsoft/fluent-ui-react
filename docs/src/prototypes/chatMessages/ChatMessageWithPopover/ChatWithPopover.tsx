import { Chat, Provider, Avatar } from '@stardust-ui/react'
import * as React from 'react'
import Popover from './Popover'
import * as _ from 'lodash'
import ReactionPopup from './ReactionPopup'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatWithPopover = () => {
  const [shouldCloseActionMenu, setShouldCloseActionMenu] = React.useState(undefined)

  const reactions = [
    {
      icon: 'thumbs up',
      content: '1K',
      key: 'likes',
      variables: { meReacting: true },
      shouldCloseMenuHandler: val => setShouldCloseActionMenu(val),
    },
    {
      icon: 'thumbs down',
      content: 2,
      key: 'dislikes',
      shouldCloseMenuHandler: val => setShouldCloseActionMenu(val),
    },
  ]

  const reactionsWithPopup = _.map(reactions, reaction => render =>
    render(reaction, (Component, props) => <ReactionPopup {...props} />),
  )

  return (
    <Provider
      theme={{
        componentStyles: {
          ChatMessage: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              '& a': {
                color: siteVariables.colors.brand[600],
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
                  actionMenu={
                    <Popover shouldCloseMenuHandler={val => setShouldCloseActionMenu(val)} />
                  }
                  variables={{ shouldCloseActionMenu }}
                  author="Jane Doe"
                  content={{
                    content: (
                      <div>
                        <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                      </div>
                    ),
                  }}
                  reactionGroup={{
                    items: reactionsWithPopup,
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
                  actionMenu={
                    <Popover shouldCloseMenuHandler={val => setShouldCloseActionMenu(val)} />
                  }
                  variables={{ shouldCloseActionMenu }}
                  author="Jane Doe"
                  content={{
                    content: (
                      <div>
                        <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                      </div>
                    ),
                  }}
                  reactionGroup={{
                    items: reactionsWithPopup,
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
                  actionMenu={
                    <Popover shouldCloseMenuHandler={val => setShouldCloseActionMenu(val)} />
                  }
                  variables={{ shouldCloseActionMenu }}
                  author="Jane Doe"
                  content={{
                    content: (
                      <div>
                        <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                      </div>
                    ),
                  }}
                  reactionGroup={{
                    items: reactionsWithPopup,
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
}

export default ChatWithPopover
