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
  // TODO improve this: each chat message needs different state for it's action menu close variable
  const [shouldCloseActionMenuCM1, setShouldCloseActionMenuCM1] = React.useState(undefined)
  const [shouldCloseActionMenuCM2, setShouldCloseActionMenuCM2] = React.useState(undefined)
  const [shouldCloseActionMenuCM3, setShouldCloseActionMenuCM3] = React.useState(undefined)

  const reactionsCM1 = [
    {
      icon: 'thumbs up',
      content: '1K',
      key: 'likes',
      variables: { meReacting: true },
      shouldCloseMenuHandler: val => setShouldCloseActionMenuCM1(val),
    },
    {
      icon: 'thumbs down',
      content: 2,
      key: 'dislikes',
      shouldCloseMenuHandler: val => setShouldCloseActionMenuCM1(val),
    },
  ]

  const reactionsWithPopupCM1 = _.map(reactionsCM1, reaction => render =>
    render(reaction, (Component, props) => <ReactionPopup {...props} />),
  )

  const reactionsCM2 = [
    {
      icon: 'thumbs up',
      content: '1K',
      key: 'likes',
      variables: { meReacting: true },
      shouldCloseMenuHandler: val => setShouldCloseActionMenuCM2(val),
    },
    {
      icon: 'thumbs down',
      content: 2,
      key: 'dislikes',
      shouldCloseMenuHandler: val => setShouldCloseActionMenuCM2(val),
    },
  ]

  const reactionsWithPopupCM2 = _.map(reactionsCM2, reaction => render =>
    render(reaction, (Component, props) => <ReactionPopup {...props} />),
  )

  const reactionsCM3 = [
    {
      icon: 'thumbs up',
      content: '1K',
      key: 'likes',
      variables: { meReacting: true },
      shouldCloseMenuHandler: val => setShouldCloseActionMenuCM3(val),
    },
    {
      icon: 'thumbs down',
      content: 2,
      key: 'dislikes',
      shouldCloseMenuHandler: val => setShouldCloseActionMenuCM3(val),
    },
  ]

  const reactionsWithPopupCM3 = _.map(reactionsCM3, reaction => render =>
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
                    <Popover shouldCloseMenuHandler={val => setShouldCloseActionMenuCM1(val)} />
                  }
                  variables={{ shouldCloseActionMenuCM1 }}
                  author="Jane Doe"
                  content={{
                    content: (
                      <div>
                        <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                      </div>
                    ),
                  }}
                  reactionGroup={{
                    items: reactionsWithPopupCM1,
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
                    <Popover shouldCloseMenuHandler={val => setShouldCloseActionMenuCM2(val)} />
                  }
                  variables={{ shouldCloseActionMenuCM2 }}
                  author="Jane Doe"
                  content={{
                    content: (
                      <div>
                        <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                      </div>
                    ),
                  }}
                  reactionGroup={{
                    items: reactionsWithPopupCM2,
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
                    <Popover shouldCloseMenuHandler={val => setShouldCloseActionMenuCM3(val)} />
                  }
                  variables={{ shouldCloseActionMenuCM3 }}
                  author="Jane Doe"
                  content={{
                    content: (
                      <div>
                        <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                      </div>
                    ),
                  }}
                  reactionGroup={{
                    items: reactionsWithPopupCM3,
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
