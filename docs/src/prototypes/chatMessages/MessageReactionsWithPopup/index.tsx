import * as React from 'react'
import * as _ from 'lodash'
import { Avatar, Chat } from '@stardust-ui/react'
import ReactionPopup from './ReactionPopup'

const getAriaLabel = ({ content: numberOfPersons, icon: emojiType }) => {
  if (numberOfPersons === 1) {
    return `One person reacted to this message with a ${emojiType} emoji. Open menu to see person who reacted.`
  }
  return `${numberOfPersons} people reacted this message with a ${emojiType} emoji. Open menu to see people who reacted.`
}

const reactions = [{ icon: 'thumbs up', content: '1K' }, { icon: 'thumbs down', content: 2 }]

const reactionsWithPopup = _.map(reactions, reaction => ({
  as: ReactionPopup,
  ...reaction,
  'aria-label': getAriaLabel(reaction),
}))

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
