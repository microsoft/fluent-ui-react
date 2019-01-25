import * as React from 'react'
import { Avatar, Chat, Provider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const content = (
  <div>
    Sure! Try one of these places:
    <br />
    <a href="#">www.goodFood1.com</a>,<br />
    <a href="#">www.goodFood2.com</a> or
    <br />
    <a href="#">www.goodFood3.com</a>
  </div>
)

const slotLabelStyles: any = (label, beforeStyles) => ({
  position: 'relative',
  border: '1px solid #000',
  padding: '12px',
  ':before': {
    content: `'${label}'`,
    position: 'absolute',
    background: '#000',
    paddingBottom: '2px',
    bottom: '-1px',
    right: '-1px',
    color: 'white',
    fontSize: '11px',
    letterSpacing: '0.1px',
    lineHeight: '9px',
    ...beforeStyles,
  },
})

const ChatMessageExampleStyled = () => (
  <Provider
    theme={{
      componentStyles: {
        ChatItem: {
          root: { ...slotLabelStyles('chat-item-root'), backgroundColor: 'transparent' },
          gutter: {
            ...slotLabelStyles('gutter', { bottom: '-11px' }),
            backgroundColor: '#FF00FF',
            padding: 0,
            position: 'absolute',
          },
        },
        ChatMessage: {
          root: { ...slotLabelStyles('chat-message-root'), backgroundColor: '#87CEFA' },
          author: ({ props: { mine } }) => ({
            ...(!mine && { ...slotLabelStyles('author'), backgroundColor: '#E0FFFF' }),
          }),
          content: { ...slotLabelStyles('content'), backgroundColor: '#F08080' },
          timestamp: { ...slotLabelStyles('timestamp'), backgroundColor: '#FFFFE0' },
        },
      },
      componentVariables: {
        ChatMessage: siteVars => ({
          content: {
            focusOutlineColor: siteVars.red,
          },
        }),
      },
    }}
  >
    <Chat
      items={[
        {
          message: {
            content: (
              <Chat.Message
                content="Hey, do you know any restaurants with good food?"
                author="John Doe"
                timestamp="Yesterday, 10:15 PM"
                mine
              />
            ),
          },
          contentPosition: 'end',
          key: 'message-id-1',
        },
        {
          key: 'message-id-2',
          gutter: { content: <Avatar {...janeAvatar} /> },
          message: {
            content: (
              <Chat.Message
                content={{ content }}
                author="Jane Doe"
                timestamp="Yesterday, 10:15 PM"
              />
            ),
          },
        },
      ]}
    />
  </Provider>
)

export default ChatMessageExampleStyled
