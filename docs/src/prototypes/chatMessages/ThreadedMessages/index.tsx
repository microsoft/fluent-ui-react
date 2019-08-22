import * as React from 'react'
import { Chat, ChatItemProps, ShorthandCollection, Avatar, Provider } from '@stardust-ui/react'
import ThreadedMessage from './ThreadedMessage'
import threadChatBehavior from './threadChatBehavior'
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
            root: ({ props: p, theme: { siteVariables } }) => ({
              '& .ui-chat__item__message': {
                width: '100%',
              },
              '&.ui-chat__item__reply': {
                padding: 0,
                backgroundColor: siteVariables.colors.grey[50],
              },
              '& .ui-chat__item__message-reply': {
                margin: 0,
              },
              '& .ui-chat__item__reply__gutter': {
                left: '15px',
                zIndex: '1111',
              },
            }),
          },
          ChatMessage: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              '&.ui-chat__message__thread': {
                padding: 0,
                width: '100%',
              },
              '&.ui-chat__message__thread-body': {
                width: '100%',
                minWidth: '100%',
                padding: 0,
                margin: 0,
                borderBottom: `1px solid ${siteVariables.colors.grey[100]}`,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,

                '& .ui-chat__message__content-inner': {
                  padding: '8px 16px',
                },
                '& .ui-chat__message__author-inner': {
                  padding: '5px 5px 5px 0',
                },
                '& .ui-chat__message__timestamp-inner': {
                  padding: '5px',
                  color: siteVariables.colors.grey[350],
                },
              },
              '&.ui-chat__message__reply': {
                width: '100%',
                minWidth: '100%',
                margin: '1px 0',
                paddingLeft: '60px',
                backgroundColor: siteVariables.colors.grey[50],
              },
              '&.ui-chat__message__reply-editor': {
                width: '100%',
                minWidth: '100%',
                padding: 0,
                margin: 0,
                backgroundColor: siteVariables.colors.grey[100],
              },
            }),
          },
          Button: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              '&.ui-button__reply': {
                border: 'none',
                justifyContent: 'start',
                marginBottom: '1px',
                boxShadow: 'none',
                textDecoration: 'none',

                '&:focus': {
                  backgroundColor: siteVariables.colors.grey[0],
                },

                '&:hover': {
                  backgroundColor: siteVariables.colors.grey[0],
                },

                '&:active': {
                  backgroundColor: siteVariables.colors.grey[0],
                },
              },
            }),
          },
          Input: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              '& .ui-input__input': {
                height: '50px',
                backgroundColor: siteVariables.colors.grey[0],
              },
            }),
          },
          Attachment: {
            root: ({ props: p, theme: { siteVariables } }) => ({
              width: '100%',
              minWidth: '100%',
              boxShadow: 'none',
              border: 0,
              backgroundColor: siteVariables.colors.brand[600],
              borderRadius: 'unset',
              marginBottom: 0,

              '&:focus': {
                backgroundColor: siteVariables.colors.brand[600],
              },

              '&:hover': {
                backgroundColor: siteVariables.colors.brand[600],
              },
            }),
            header: ({ props: p, theme: { siteVariables } }) => ({
              color: siteVariables.colors.grey[0],
            }),
            description: ({ props: p, theme: { siteVariables } }) => ({
              color: siteVariables.colors.grey[0],
            }),
            icon: ({ props: p, theme: { siteVariables } }) => ({
              color: siteVariables.colors.grey[0],
            }),
          },
        },
      }}
    >
      <Chat accessibility={threadChatBehavior} items={items} />
    </Provider>
  )
}
export default ChatExampleWithThreadedMessages
