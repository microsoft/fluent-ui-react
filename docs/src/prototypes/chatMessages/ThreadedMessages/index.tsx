import * as React from 'react'
import { Chat, ChatItemProps, ShorthandCollection, Avatar, Provider } from '@fluentui/react'
import ThreadedMessage from './ThreadedMessage'
import threadChatBehavior from './threadChatBehavior'
import { janeAvatar, replies } from './mockData'
import customizedTheme from './theme'

const ChatExampleWithThreadedMessages = () => {
  const items: ShorthandCollection<ChatItemProps> = [
    {
      gutter: <Avatar {...janeAvatar} />,
      message: (
        <ThreadedMessage
          subject="Beer on Friday evening"
          content="Weather is perfect for a beer outside. What do you think?"
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
          replies={replies}
        />
      ),
      key: 'thread-message-id-1',
    },
    {
      gutter: <Avatar {...janeAvatar} />,
      message: (
        <ThreadedMessage
          content="Scheduled a meeting"
          author="Jane Doe"
          meeting={{
            header: 'Team Standup',
            description: 'Occurs every work day (Mon-Fri) @10:30 AM',
          }}
          timestamp="Yesterday, 15:15 PM"
        />
      ),
      key: 'thread-message-id-2',
    },
  ]

  return (
    <Provider theme={customizedTheme}>
      <Chat accessibility={threadChatBehavior} items={items} />
    </Provider>
  )
}
export default ChatExampleWithThreadedMessages
