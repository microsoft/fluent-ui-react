import * as React from 'react'
import { Chat, ChatItemProps, ShorthandCollection, Avatar, Provider } from '@stardust-ui/react'
import ThreadedMessage from './ThreadedMessage'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

const actionMenu = {
  iconOnly: true,
  items: [
    {
      key: 'like',
      icon: 'like',
      title: 'Like',
    },
    {
      key: 'more',
      icon: 'more',
      title: 'More actions',
    },
  ],
}

const ChatExampleWithThreadedMessages = () => {
  const items: ShorthandCollection<ChatItemProps> = [
    {
      gutter: <Avatar {...janeAvatar} />,
      message: (
        <ThreadedMessage
          subject="Beer on Friday evening"
          content="Sure! Let's try it."
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
          actionMenu={actionMenu}
        />
      ),
      key: 'thread-message-id-1',
    },
    {
      gutter: <Avatar {...janeAvatar} />,
      message: (
        <ThreadedMessage
          subject="Beer on Friday evening"
          content="Sure! Let's try it."
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
          actionMenu={actionMenu}
        />
      ),
      key: 'thread-message-id-2',
    },
  ]

  return (
    <Provider
      theme={{
        componentStyles: {
          ChatItem: {
            root: {
              '& .ui-chat__item__message': {
                width: '100%',
              },
            },
          },
          ChatMessage: {
            root: {
              '&.ui-chat__message__thread': {
                padding: 0,
                width: '100%',
              },
              '&.ui-chat__message__thread-body': {
                width: '100%',
                minWidth: '100%',
                // / TODO change grey
                borderBottom: '1px solid grey',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
          },
        },
      }}
    >
      <Chat items={items} />
    </Provider>
  )
}
export default ChatExampleWithThreadedMessages
