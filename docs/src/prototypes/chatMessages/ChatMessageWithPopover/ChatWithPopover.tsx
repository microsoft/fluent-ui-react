import {
  Chat,
  Provider,
  Avatar,
  ChatMessageProps,
  ShorthandCollection,
  ReactionProps,
} from '@fluentui/react'
import * as React from 'react'
import Popover from './Popover'
import ReactionPopup from './ReactionPopup'
import { Ref } from '@fluentui/react-component-ref'

const reactions: ShorthandCollection<ReactionProps> = [
  {
    icon: 'thumbs up',
    content: '1K',
    key: 'likes',
    variables: { meReacting: true },
    children: (Component, props) => <ReactionPopup {...props} />,
  },
  {
    icon: 'emoji',
    content: 2,
    key: 'smiles',
    children: (Component, props) => <ReactionPopup {...props} />,
  },
]

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
            message: (
              <TeamsChatMessage
                author="Jane Doe"
                content={
                  <div>
                    <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                  </div>
                }
                reactionGroup={{
                  items: reactions,
                }}
                timestamp="Yesterday, 10:15 PM"
              />
            ),
            gutter: <Avatar {...janeAvatar} />,
          },
          {
            key: 'b',
            message: (
              <TeamsChatMessage
                author="Jane Doe"
                content={
                  <div>
                    <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                  </div>
                }
                reactionGroup={{
                  items: reactions,
                }}
                timestamp="Yesterday, 10:15 PM"
              />
            ),
            gutter: <Avatar {...janeAvatar} />,
          },
        ]}
      />
    </Provider>
  )
}

const TeamsChatMessage: React.FC<ChatMessageProps> = (props: ChatMessageProps) => {
  const [showActionMenu, setShowActionMenu] = React.useState(false)
  const [forceShowActionMenu, setForceShowActionMenu] = React.useState(false)
  const [chatMessageElement, setChatMessageElement] = React.useState<HTMLElement>(null)

  const handleBlur = e => !e.currentTarget.contains(e.relatedTarget) && setShowActionMenu(false)

  return (
    <Ref innerRef={setChatMessageElement}>
      <Chat.Message
        {...props}
        actionMenu={{
          children: (Component, props) => (
            <Popover
              chatMessageElement={chatMessageElement}
              onForceShowActionMenuChange={setForceShowActionMenu}
              onShowActionMenuChange={setShowActionMenu}
              {...props}
            />
          ),
        }}
        onMouseEnter={() => setShowActionMenu(true)}
        onMouseLeave={() => !forceShowActionMenu && setShowActionMenu(false)}
        onFocus={() => setShowActionMenu(true)}
        onBlur={handleBlur}
        variables={{ showActionMenu }}
      />
    </Ref>
  )
}

export default ChatWithPopover
