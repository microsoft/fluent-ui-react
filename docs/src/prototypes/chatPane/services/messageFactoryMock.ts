import * as _ from 'lodash'
import { IChatMessageProps } from 'src/components/Chat'
import { IDividerProps } from 'src/components/Divider'
import { IStatusProps } from 'src/components/Status'
import { Extendable } from 'utils'
import { IChat, UserStatus, IMessage, IUser, areSameDay, getFriendlyDateString } from '.'

export enum ChatItemType {
  message,
  divider,
}

interface IChatItemType {
  itemType: ChatItemType
}
interface IChatMessage extends IChatMessageProps, IChatItemType {
  tabIndex: number
  'aria-labelledby': string
  contentMessageId: any
  senderMessageId: any
  timeMessageId: any
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
    'aria-labelledby': `sender-message-${msg.id} time-message-${msg.id} message-content-${msg.id} `,
    contentMessageId: `message-content-${msg.id}`,
    senderMessageId: `sender-message-${msg.id}`,
    timeMessageId: `time-message-${msg.id}`,
    content,
    mine,
    tabIndex: 0,
    timestamp: { content: msg.timestamp, title: msg.timestampLong },
    author: fromUser && `${fromUser.firstName} ${fromUser.lastName}`,
    avatar: !msg.mine && { image: fromUser.avatar, status: statusMap.get(fromUser.status) },
    itemType: ChatItemType.message,
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
