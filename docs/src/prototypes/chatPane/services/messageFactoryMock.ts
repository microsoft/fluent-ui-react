import * as _ from 'lodash'
import { IChatMessageProps } from 'src/components/Chat/ChatMessage'
import { IDividerProps } from 'src/components/Divider/Divider'
import { IStatusProps } from 'src/components/Status/Status'
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
  const { content, important, type = 'secondary' } = props
  const dividerProps: IDivider = { itemType: ChatItemType.divider, content, important, type }

  return dividerProps
}

export function generateChatProps(chat: IChat): ChatItemContentProps[] {
  if (!chat || !chat.members || !chat.messages) {
    return []
  }

  const { messages, members } = chat
  const chatProps: ChatItemContentProps[] = []

  // First date divider
  chatProps.push(generateDividerProps({ content: getFriendlyDateString(messages[0].date) }))

  for (let i = 0; i < messages.length - 1; i++) {
    const [msg1, msg2] = [messages[i], messages[i + 1]]
    chatProps.push(generateChatMsgProps(msg1, members.get(msg1.from)))

    if (!areSameDay(msg1.date, msg2.date)) {
      // Generating divider when date changes
      chatProps.push(generateDividerProps({ content: getFriendlyDateString(msg2.date) }))
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
