import { Chat, Provider, Avatar, ChatMessageProps } from '@stardust-ui/react'
import * as React from 'react'
import Popover from './Popover'
import ReactionPopup from './ReactionPopup'
import { Ref } from '@stardust-ui/react-component-ref'

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

const reactionsWithPopup = reactions.map(reaction => render =>
  render(reaction, (Component, props) => <ReactionPopup {...props} />),
)

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatWithPopover = () => {
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
                <TeamsChatMessage
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
                <TeamsChatMessage
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

const TeamsChatMessage: React.FC<ChatMessageProps> = (props: ChatMessageProps) => {
  const [showActionMenu, setShowActionMenu] = React.useState(false)
  const [forceShowActionMenu, setForceShowActionMenu] = React.useState(false)
  const [chatMessageRef, setChatMessageRef] = React.useState<HTMLElement>(null)

  return (
    <Ref innerRef={setChatMessageRef}>
      <Chat.Message
        {...props}
        actionMenu={
          <Popover
            chatMessageRef={chatMessageRef}
            setFixedMode={setForceShowActionMenu}
            setOpen={setShowActionMenu}
          />
        }
        onMouseEnter={() => setShowActionMenu(true)}
        onMouseLeave={() => !forceShowActionMenu && setShowActionMenu(false)}
        onFocus={() => setShowActionMenu(true)}
        onBlur={() => setShowActionMenu(false)}
        variables={{ showActionMenu }}
      />
    </Ref>
  )
}

export default ChatWithPopover
