import * as React from 'react'
import * as _ from 'lodash'
import { Avatar, Chat, Popup, Menu, popupFocusTrapBehavior } from '@stardust-ui/react'

const reactions = [{ icon: 'thumbs up', content: '1K' }, { icon: 'thumbs down', content: 2 }]
const reactionsWithPopup = _.map(reactions, reaction => render =>
  render(reaction, (Component, props) => (
    <Popup
      trigger={<Component as="button" {...props} />}
      accessibility={popupFocusTrapBehavior}
      content={{
        content: <Menu items={['Marija Najdova', 'John Doe']} />,
      }}
      on="hover"
    />
  )),
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
