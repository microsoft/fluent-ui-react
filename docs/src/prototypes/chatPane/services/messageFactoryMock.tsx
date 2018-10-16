import * as _ from 'lodash'
import { IChatMessageProps } from 'src/components/Chat'
import { IDividerProps } from 'src/components/Divider'
import { IStatusProps } from 'src/components/Status'
import { Extendable } from 'utils'
import { IChat, UserStatus, IMessage, IUser, areSameDay, getFriendlyDateString } from '.'
import { Attachment, Popup, Button, Menu } from '@stardust-ui/react'
import * as React from 'react'

function getMessageContent(content, messageId) {
  const menu = (
    <Menu
      defaultActiveIndex={0}
      items={[
        { key: 'editorials', content: 'Editorials' },
        { key: 'review', content: 'Reviews' },
        { key: 'events', content: 'Upcoming Events' },
      ]}
      vertical
    />
  )

  const actionPopup = (
    <Popup trigger={<Button iconOnly icon="ellipsis horizontal" />} content={{ content: menu }} />
  )
  return (
    <span>
      <span id={`content-${messageId}`}>
        {content}
        <a href="/"> Some link </a>
        {content}
      </span>
      <br />
      <br />
      <Attachment
        icon="file word outline"
        aria-label="File attachment MeetingNotes.pptx Press tab for more options Press Enter to open the file"
        header="MeetingNotes.pptx"
        action={{ icon: 'ellipsis horizontal' }}
        renderAction={() => actionPopup}
        data-is-focusable={true}
      />
      <Attachment
        icon="file word outline"
        aria-label="File attachment Document.docx Press tab for more options Press Enter to open the file"
        header="Document.docx"
        action={{ icon: 'ellipsis horizontal' }}
        renderAction={() => actionPopup}
        data-is-focusable={true}
      />
    </span>
  )
}

export enum ChatItemType {
  message,
  divider,
}

interface IChatItemType {
  itemType: ChatItemType
}
interface IChatMessage extends IChatMessageProps, IChatItemType {
  tabIndex: number
  role: string
  'aria-labelledby': string
  text: string
}
interface IDivider extends IDividerProps, IChatItemType {}

type ChatItemContentProps = IChatMessage | IDivider
type StatusProps = Extendable<IStatusProps>

const statusMap: Map<UserStatus, StatusProps> = new Map([
  ['Available', { color: 'green', icon: 'check', title: 'Available' }],
  ['DoNotDisturb', { color: 'red', icon: 'minus', title: 'Do not disturb' }],
  ['Away', { color: 'yellow', icon: 'clock', title: 'Away' }],
  ['Offline', { color: 'grey', title: 'Offline' }],
] as [UserStatus, StatusProps][])

function generateChatMsgProps(msg: IMessage, fromUser: IUser): IChatMessage {
  const { content, mine } = msg
  const msgProps: IChatMessage = {
    // aria-labelledby will need to by generated based on the needs. Currently just hardcoded.
    role: 'none',
    'aria-labelledby': `sender-${msg.id} timestamp-${msg.id} content-${msg.id}`,
    content: getMessageContent(content, msg.id),
    mine,
    tabIndex: 0,
    timestamp: {
      content: msg.timestamp,
      title: msg.timestampLong,
      id: `timestamp-${msg.id}`,
      'aria-label': `Sent on ${msg.timestampLong}`,
    },
    author: fromUser && {
      content: `${fromUser.firstName} ${fromUser.lastName}`,
      id: `sender-${msg.id}`,
      'aria-label': `Message from ${fromUser.firstName} ${fromUser.lastName}`,
    },
    avatar: !msg.mine && {
      image: fromUser.avatar,
      status: statusMap.get(fromUser.status),
      ['aria-hidden']: true,
    },
    itemType: ChatItemType.message,
    text: content,
  }

  return msgProps
}

function generateDividerProps(props: IDividerProps): IDivider {
  const { content, important, type = 'secondary', role } = props
  const ariaLevel = props['aria-level']
  const dividerProps: IDivider = {
    itemType: ChatItemType.divider,
    content,
    important,
    type,
    role,
    ['aria-level']: ariaLevel,
  }

  return dividerProps
}

export function generateChatProps(chat: IChat): ChatItemContentProps[] {
  if (!chat || !chat.members || !chat.messages) {
    return []
  }

  const { messages, members } = chat
  const chatProps: ChatItemContentProps[] = []

  // First date divider
  chatProps.push(
    generateDividerProps({
      role: 'heading',
      'aria-level': 3,
      content: getFriendlyDateString(messages[0].date),
    }),
  )

  for (let i = 0; i < messages.length - 1; i++) {
    const [msg1, msg2] = [messages[i], messages[i + 1]]
    chatProps.push(generateChatMsgProps(msg1, members.get(msg1.from)))

    if (!areSameDay(msg1.date, msg2.date)) {
      // Generating divider when date changes
      chatProps.push(
        generateDividerProps({
          role: 'heading',
          'aria-level': 3,
          content: getFriendlyDateString(msg2.date),
        }),
      )
    }
  }

  const lastMsg = messages[messages.length - 1]
  chatProps.push(generateChatMsgProps(lastMsg, members.get(lastMsg.from)))

  // Last read divider
  const myLastMsgIndex: number = _.findLastIndex(chatProps, item => item.mine)
  if (myLastMsgIndex < chatProps.length - 1) {
    chatProps.splice(
      myLastMsgIndex + 1,
      0,
      generateDividerProps({ content: 'Last read', type: 'primary', important: true }),
    )
  }

  return chatProps
}
