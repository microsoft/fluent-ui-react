import * as React from 'react'
import { Chat, ChatItemProps, ShorthandCollection, Avatar, Provider } from '@stardust-ui/react'
import ThreadedMessage from './ThreadedMessage'
import { janeAvatar, replies } from './mockData'

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
          subject="Beer on Friday evening"
          content="Sure! Let's try it."
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
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
              '&.ui-chat__item__reply': {
                padding: 0,
                // TODO take color from variables
                backgroundColor: '#f7f7f7',
              },
              '& .ui-chat__item__message-reply': {
                margin: 0,
              },
              '& .ui-chat__item__reply__gutter': {
                left: '15px',
                zIndex: '1111',
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
                // TODO take color from variables
                borderBottom: '1px solid #f3f2f1',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
              '&.ui-chat__message__reply': {
                width: '100%',
                minWidth: '100%',
                margin: '1px 0',
                paddingLeft: '60px',
                // TODO take color from variables
                backgroundColor: '#f7f7f7',
              },
              '&.ui-chat__message__reply-editor': {
                width: '100%',
                minWidth: '100%',
                padding: 0,
                margin: 0,
                // TODO take color from variables
                backgroundColor: '#f3f2f1',
              },
            },
          },
          Button: {
            root: {
              '&.ui-button-replies': {
                border: 'none',
                marginBottom: '1px',
                justifyContent: 'start',
                boxShadow: 'none',
                textDecoration: 'none',
              },
            },
          },
          Input: {
            root: {
              '& .ui-input__input': {
                height: '50px',
                // TODO take color from variables
                backgroundColor: '#fff',
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
