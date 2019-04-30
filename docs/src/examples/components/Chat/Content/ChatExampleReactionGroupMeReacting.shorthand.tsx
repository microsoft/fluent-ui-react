import * as React from 'react'
import * as _ from 'lodash'
import { Avatar, Chat } from '@stardust-ui/react'

const reactions = [
  { icon: 'thumbs up', content: '1K', key: 'likes', variables: { meReacting: true }, as: 'button' },
  { icon: 'thumbs down', content: 2, key: 'dislikes', as: 'button' },
]

const items = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: {
      content: (
        <Chat.Message
          reactionGroup={{
            items: reactions,
          }}
          content="Hello"
          author="John Doe"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      ),
    },
    key: 'message-1',
  },
  {
    attached: 'bottom',
    contentPosition: 'end',
    key: 'message-2',
    message: {
      content: (
        <Chat.Message
          reactionGroup={reactions}
          reactionGroupPosition="end"
          content="I'm back!"
          author="John Doe"
          timestamp="Yesterday, 10:15 PM"
          mine
        />
      ),
    },
  },
  {
    gutter: {
      content: <Avatar image="public/images/avatar/small/ade.jpg" />,
    },
    message: {
      content: (
        <Chat.Message
          reactionGroup={reactions}
          content="Hi"
          author="Jane Doe"
          timestamp="Yesterday, 10:15 PM"
        />
      ),
    },
    key: 'message-3',
  },
]

const MessageReactionsWithPopup = () => <Chat items={items} />

export default MessageReactionsWithPopup
