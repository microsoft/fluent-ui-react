import { Chat } from '@stardust-ui/react'

import * as React from 'react'
import Popover, { handleBlur, handleFocus } from './Popover'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

class ChatMessageWithPopover extends React.Component {
  render() {
    return (
      <Chat.Message
        styles={{
          position: 'relative',

          '&.focused .actions': {
            opacity: 1,
          },
          ':hover .actions': {
            opacity: 1,
          },
          '& a': {
            color: '#6264A7',
          },
        }}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
}

const CustomChat = () => (
  <Chat
    items={[
      { key: 'a', content: <ChatMessageWithPopover /> },
      { key: 'b', content: <ChatMessageWithPopover /> },
      { key: 'c', content: <ChatMessageWithPopover /> },
    ]}
  />
)

export default CustomChat
