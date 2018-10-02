import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import { Chat } from '@stardust-ui/react'

import { IChat, UserStatus, IMessage, IUser } from './data/interfaces'
import { IChatMessageProps } from 'src/components/Chat'
import { IStatusProps } from 'src/components/Status/Status'
import { Extendable } from 'utils'
import Divider, { IDividerProps } from 'src/components/Divider'
import { areSameDay, getFriendlyDateString } from './data/dateUtils'

export interface IChatPaneContainerProps {
  chat: IChat
}

enum ChatItemType {
  message,
  divider,
}
type ChatMessageProps = IChatMessageProps & { itemType: ChatItemType; tabIndex: number }
type DividerProps = IDividerProps & { itemType: ChatItemType }
type StatusProps = Extendable<IStatusProps>

const statusMap: Map<UserStatus, StatusProps> = new Map([
  ['Available', { color: 'green', icon: 'check', title: 'Available' }],
  ['DoNotDisturb', { color: 'red', icon: 'minus', title: 'Do not disturb' }],
  ['Away', { color: 'yellow', icon: 'clock', title: 'Away' }],
  ['Offline', { color: 'grey', title: 'Offline' }],
] as [UserStatus, StatusProps][])

class ChatPaneContainer extends React.PureComponent<IChatPaneContainerProps> {
  public render() {
    const items = this.generateChatItems(this.props.chat)

    return (
      items.length > 0 && (
        <Scrollbars ref={this.handleScrollRef}>
          <Chat items={items} styles={{ padding: '0 32px' }} />
        </Scrollbars>
      )
    )
  }

  private generateChatItems(chat: IChat): JSX.Element[] {
    return this.generateChatProps(chat).map(({ itemType, ...props }, index) => {
      const ElementType = itemType === ChatItemType.message ? Chat.Message : Divider
      return (
        <Chat.Item key={`chat-item-${index}`}>
          <ElementType {...props} />
        </Chat.Item>
      )
    })
  }

  private generateChatProps(chat: IChat): (ChatMessageProps | DividerProps)[] {
    if (!chat || !chat.members || !chat.messages) {
      return []
    }

    const { messages, members } = chat
    const chatProps: (ChatMessageProps | DividerProps)[] = []

    // First date divider
    chatProps.push(this.generateDividerProps({ content: getFriendlyDateString(messages[0].date) }))

    for (let i = 0; i < messages.length - 1; i++) {
      const [msg1, msg2] = [messages[i], messages[i + 1]]
      chatProps.push(this.generateChatMsgProps(msg1, members.get(msg1.from)))

      if (!areSameDay(msg1.date, msg2.date)) {
        // Generating divider when date changes
        chatProps.push(this.generateDividerProps({ content: getFriendlyDateString(msg2.date) }))
      }
    }

    const lasgMsg = messages[messages.length - 1]
    chatProps.push(this.generateChatMsgProps(lasgMsg, members.get(lasgMsg.from)))

    // Last read divider
    const myLastMsgIndex: number = _.findLastIndex(chatProps, item => item.mine)
    if (myLastMsgIndex < chatProps.length - 1) {
      chatProps.splice(
        myLastMsgIndex + 1,
        0,
        this.generateDividerProps({ content: 'Last read', type: 'primary', important: true }),
      )
    }

    return chatProps
  }

  private generateChatMsgProps(msg: IMessage, fromUser: IUser): ChatMessageProps {
    const { content, mine } = msg
    const msgProps: ChatMessageProps = {
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

  private generateDividerProps(props: IDividerProps): DividerProps {
    const { content, important, type = 'secondary' } = props
    const dividerProps: DividerProps = { itemType: ChatItemType.divider, content, important, type }

    return dividerProps
  }

  private handleScrollRef(scrollRef: Scrollbars) {
    if (scrollRef) {
      scrollRef.scrollToBottom()
    }
  }
}

export default ChatPaneContainer
