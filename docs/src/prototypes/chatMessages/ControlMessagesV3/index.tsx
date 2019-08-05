import * as React from 'react'
import {
  Chat,
  ChatItemProps,
  ChatMessageProps,
  ShorthandCollection,
  Avatar,
  Divider,
  Flex,
  Icon,
} from '@stardust-ui/react'
import * as keyboardKey from 'keyboard-key'

import ControlMessage from './ControlMessage'
import GroupControlMessage from './GroupControlMessage'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

const controlMessageItems: ChatMessageProps[] = [
  {
    content: (
      <Chat.Message
        content={
          <div>
            <a href="/">John Doe</a> added <a href="/">Jane Doe</a> to the conversation
          </div>
        }
      />
    ),
  },
  {
    content: (
      <Chat.Message
        content={
          <div>
            <a href="/">John Doe1</a> added <a href="/">Jane Doe1</a> to the conversation
          </div>
        }
      />
    ),
  },
  {
    content: (
      <Chat.Message
        content={
          <div>
            <a href="/">John Doe2</a> added <a href="/">Jane Doe2</a> to the conversation
          </div>
        }
      />
    ),
  },
]

const ChatExample = () => {
  const [expanded, setExpanded] = React.useState(false)
  const [focused, setFocused] = React.useState(false)

  const items: ShorthandCollection<ChatItemProps> = [
    {
      message: {
        onKeyDown: e => {
          const eventCode = keyboardKey.getCode(e)
          if (eventCode === keyboardKey.Enter || eventCode === keyboardKey.Spacebar) {
            setExpanded(true)
          }
          if (eventCode === keyboardKey.Escape) {
            setExpanded(false)
            setFocused(true)
          }
        },
        content: (
          <Flex>
            <Icon name="stardust-arrow-end" onClick={() => setExpanded(!expanded)} />
            <Icon name="participant-add" />
            {expanded ? (
              <GroupControlMessage items={controlMessageItems} />
            ) : (
              <ControlMessage messageFocused={focused} message={controlMessageItems[0]} />
            )}
          </Flex>
        ),
      },
    },
    {
      gutter: {
        content: <Avatar {...janeAvatar} />,
      },
      message: {
        content: (
          <Chat.Message
            content="Sure! Let's try it."
            author="Jane Doe"
            timestamp="Yesterday, 10:15 PM"
          />
        ),
      },
      key: 'message-id-8',
    },
    {
      children: <Divider content="Today" color="brand" important />,
      key: 'message-id-9',
    },
    {
      message: {
        content: (
          <Chat.Message
            content="Ok, let's go."
            author="John Doe"
            timestamp="Today, 11:15 PM"
            mine
          />
        ),
      },
      contentPosition: 'end',
      key: 'message-id-10',
    },
  ]
  return <Chat items={items} />
}

export default ChatExample
