import * as React from 'react'
import { Chat, ChatItemProps, ShorthandCollection, Avatar, Divider } from '@stardust-ui/react'
import GroupControlMessages from './GroupControlMessages'
import ControlMessage from './ControlMessage'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

const ChatExample = () => {
  const items: ShorthandCollection<ChatItemProps> = [
    {
      message: {
        content: (
          // Adding control message
          <ControlMessage
            icon={true}
            message={{
              content: (
                <div>
                  <a href="/">John Doe</a> joined the team
                </div>
              ),
            }}
          />
        ),
        styles: {
          marginLeft: '16px',
        },
      },
    },
    {
      message: {
        content: (
          // Adding Grouped control messages
          <GroupControlMessages />
        ),
        styles: {
          marginLeft: 0,
        },
      },
    },
    {
      gutter: {
        content: <Avatar {...janeAvatar} />,
      },
      message: {
        content: (
          <Chat.Message
            content="Sure! Let's try it."
            author="Jane Doe"
            timestamp="Yesterday, 10:15 PM"
          />
        ),
      },
      key: 'message-id-8',
    },
    {
      children: <Divider content="Today" color="brand" important />,
      key: 'message-id-9',
    },
    {
      message: {
        content: (
          <Chat.Message
            content="Ok, let's go."
            author="John Doe"
            timestamp="Today, 11:15 PM"
            mine
          />
        ),
      },
      contentPosition: 'end',
      key: 'message-id-10',
    },
  ]
  return <Chat items={items} />
}

export default ChatExample
