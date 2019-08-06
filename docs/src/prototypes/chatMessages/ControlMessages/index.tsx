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
import GroupControlMessages from './GroupControlMessages'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: {
    color: 'green',
    icon: 'check',
  },
}

const groupControlMessageItems: ChatMessageProps[] = [
  {
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe1</a> to the team
      </div>
    ),
  },
  {
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe2</a> to the team
      </div>
    ),
  },
  {
    content: (
      <div>
        <a href="/">John Doe</a> has added <a href="/">Jane Doe3</a> to the team
      </div>
    ),
  },
]

const controlMessage = {
  content: (
    <div>
      <a href="/">John Doe</a> has added <a href="/">Jane Doe1</a> and 2 other to the team
    </div>
  ),
}

const ChatExample = () => {
  const [expanded, setExpanded] = React.useState(false)
  const [focused, setFocused] = React.useState(false)

  const items: ShorthandCollection<ChatItemProps> = [
    {
      message: {
        onKeyDown: e => {
          const eventCode = keyboardKey.getCode(e)
          if (eventCode === keyboardKey.Enter) {
            setExpanded(true)
          }
          if (eventCode === keyboardKey.Escape) {
            setExpanded(false)
            setFocused(true)
          }
        },
        content: (
          <Flex>
            <Icon
              name={expanded ? 'stardust-arrow-down' : 'stardust-arrow-end'}
              onClick={() => setExpanded(!expanded)}
            />
            <Icon name="participant-add" />
            {expanded ? (
              <GroupControlMessages items={groupControlMessageItems} />
            ) : (
              <ControlMessage focused={focused} message={controlMessage} />
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
