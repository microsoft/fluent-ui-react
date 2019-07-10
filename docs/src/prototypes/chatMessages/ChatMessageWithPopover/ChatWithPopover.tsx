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

interface TeamsChatMessageState {
  showActionMenu: boolean
  forceShowActionMenu: boolean
}

class TeamsChatMessage extends React.Component<ChatMessageProps, TeamsChatMessageState> {
  state = {
    showActionMenu: false,
    forceShowActionMenu: false,
  }
  chatMessageRef = React.createRef<HTMLElement>()

  render() {
    return (
      <Ref innerRef={this.chatMessageRef}>
        <Chat.Message
          {...this.props}
          actionMenu={
            <Popover
              chatMessageRef={this.chatMessageRef}
              setFixedMode={val => this.setState({ forceShowActionMenu: val })}
              setOpen={val => this.setState({ showActionMenu: val })}
            />
          }
          onMouseEnter={() => this.setState({ showActionMenu: true })}
          onMouseLeave={() =>
            !this.state.forceShowActionMenu && this.setState({ showActionMenu: false })
          }
          onFocus={() => this.setState({ showActionMenu: true })}
          onBlur={() => this.setState({ showActionMenu: false })}
          variables={{ showActionMenu: this.state.showActionMenu }}
        />
      </Ref>
    )
  }
}

export default ChatWithPopover
