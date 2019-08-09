import * as React from 'react'
import {
  Avatar,
  Chat,
  ChatItemProps,
  ShorthandCollection,
  Text,
  Icon,
  Flex,
} from '@stardust-ui/react'

const [janeAvatar, johnAvatar] = [
  'public/images/avatar/small/ade.jpg',
  'public/images/avatar/small/joe.jpg',
].map(src => ({
  image: src,
  status: { color: 'green', icon: 'check' },
}))

const customSlots = [
  {
    position: 'afterTimestamp',
    content: (
      <Flex
        vAlign="center"
        gap="gap.smaller"
        styles={{
          marginLeft: '4px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Icon name="error" color="red" size="small" />
        <Text error size="small" truncated content="Failed to send" />
      </Flex>
    ),
  },
  {
    position: 'afterTimestamp',
    content: <Text size="small" content="Resending..." />,
  },
]

const items: ShorthandCollection<ChatItemProps> = [
  {
    contentPosition: 'start',
    gutter: <Avatar {...johnAvatar} />,
    message: (
      <Chat.Message
        content="Hello"
        author="John Doe"
        timestamp="Yesterday, 10:15 PM"
        customSlots={customSlots}
      />
    ),
    key: 'message-id-1',
  },
  {
    contentPosition: 'end',
    gutter: <Avatar {...janeAvatar} />,
    message: (
      <Chat.Message
        content="Hi"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        mine
        customSlots={customSlots}
      />
    ),
    key: 'message-id-2',
  },
]

const ChatExampleCustomSlots = () => <Chat items={items} />

export default ChatExampleCustomSlots
