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
                padding: 0,
                margin: 0,
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
              '&.ui-button__reply': {
                border: 'none',
                justifyContent: 'start',
                marginBottom: '1px',
                boxShadow: 'none',
                textDecoration: 'none',

                '&:focus': {
                  backgroundColor: '#fff',
                },

                '&:hover': {
                  backgroundColor: '#fff',
                },

                '&:active': {
                  backgroundColor: '#fff',
                },
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
          Attachment: {
            root: {
              width: '100%',
              minWidth: '100%',
              boxShadow: 'none',
              border: 0,
              backgroundColor: 'rgb(98, 100, 167)',
              borderRadius: 'unset',
              marginBottom: 0,

              '&:focus': {
                backgroundColor: 'rgb(98, 100, 167)',
              },

              '&:hover': {
                backgroundColor: 'rgb(98, 100, 167)',
              },
            },
            header: {
              color: '#fff',
            },
            description: {
              color: '#fff',
            },
            icon: {
              color: '#fff',
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
