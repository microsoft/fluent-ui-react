import { Chat, Provider } from '@stardust-ui/react'

import * as React from 'react'
import Popover from './Popover'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

class ChatMessageWithPopover extends React.Component {
  state = {
    focused: false,
  }

  changeFocusState = (isFocused: boolean) => {
    this.state.focused !== isFocused && this.setState({ focused: isFocused })
  }

  handleFocus = () => {
    this.changeFocusState(true)
  }

  handleBlur = e => {
    const shouldPreserveFocusState = e.currentTarget.contains(e.relatedTarget)
    this.changeFocusState(shouldPreserveFocusState)
  }

  render() {
    return (
      <Chat.Message
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        content={{
          content: (
            <div>
              <Popover className="actions" />
              <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
            </div>
          ),
        }}
        avatar={janeAvatar}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={this.state.focused ? 'focused' : undefined}
      />
    )
  }
}

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
