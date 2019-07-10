import { Chat, Provider, Avatar } from '@stardust-ui/react'
import * as React from 'react'
import Popover from './Popover'
import * as _ from 'lodash'
import ReactionPopup from './ReactionPopup'

const reactions = [
  {
    icon: 'thumbs up',
    content: '1K',
    key: 'likes',
    variables: { meReacting: true },
  },
  {
    icon: 'thumbs down',
    content: 2,
    key: 'dislikes',
  },
]

const reactionsWithPopup = _.map(reactions, reaction => render =>
  render(reaction, (Component, props) => <ReactionPopup {...props} />),
)

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatWithPopover = () => {
  // TODO improve this: each chat message needs different state for it's action menu close variable
  const [openCM1, setOpenCM1] = React.useState(false)
  const [fixedModeCM1, setFixedModeCM1] = React.useState(false)

  const [openCM2, setOpenCM2] = React.useState(false)
  const [fixedModeCM2, setFixedModeCM2] = React.useState(false)

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
                    <Popover setFixedMode={setFixedModeCM1} setOpen={val => setOpenCM1(val)} />
                  }
                  onMouseEnter={() => setOpenCM1(true)}
                  onMouseLeave={() => !fixedModeCM1 && setOpenCM1(false)}
                  onFocus={() => setOpenCM1(true)}
                  onBlur={() => setOpenCM1(false)}
                  variables={{
                    open: openCM1,
                  }}
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
                    <Popover setFixedMode={setFixedModeCM2} setOpen={val => setOpenCM2(val)} />
                  }
                  onMouseEnter={() => setOpenCM2(true)}
                  onMouseLeave={() => !fixedModeCM2 && setOpenCM2(false)}
                  onFocus={() => setOpenCM2(true)}
                  onBlur={() => setOpenCM2(false)}
                  variables={{ open: openCM2 }}
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
