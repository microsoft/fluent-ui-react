import * as React from 'react'
import * as _ from 'lodash'
import { Avatar, Chat } from '@stardust-ui/react'
import ReactionPopup from './ReactionPopup'

const reactions = [
  { icon: 'thumbs up', content: '1K', key: 'likes', variables: { meReacting: true } },
  { icon: 'thumbs down', content: 2, key: 'dislikes' },
]

const reactionsWithPopup = _.map(reactions, reaction => render =>
  render(reaction, (Component, props) => <ReactionPopup {...props} />),
)

const actionMenu = {
  iconOnly: true,
  items: [
    { key: 'like', icon: 'like', title: 'Like' },
    { key: 'more', icon: 'more', title: 'More actions' },
  ],
}

const items = [
  {
    attached: 'top',
    contentPosition: 'end',
    message: {
      content: (
        <Chat.Message
          reactionGroup={{
            items: reactionsWithPopup,
          }}
          actionMenu={actionMenu}
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
          reactionGroup={{ items: reactionsWithPopup }}
          actionMenu={actionMenu}
          reactionGroupPosition={'end'}
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
          reactionGroup={{
            items: reactionsWithPopup,
          }}
          actionMenu={actionMenu}
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
