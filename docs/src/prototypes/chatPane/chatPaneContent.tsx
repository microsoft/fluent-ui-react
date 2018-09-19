import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import { Chat } from '@stardust-ui/react'

import { IChat, UserStatus } from './data/interfaces'
import { IChatMessageProps } from 'src/components/Chat'
import { IStatusProps } from 'src/components/Status/Status'
import { Extendable } from 'utils'

export interface IChatPaneContainerProps {
  chat: IChat
}

type StatusProps = Extendable<IStatusProps>

const statusMap: Map<UserStatus, StatusProps> = new Map([
  ['Available', { color: 'green', icon: 'check', title: 'Available' }],
  ['DoNotDisturb', { color: 'red', icon: 'minus', title: 'Do not disturb' }],
  ['Away', { color: 'yellow', icon: 'clock', title: 'Away' }],
  ['Offline', { color: 'grey', title: 'Offline' }],
] as [UserStatus, StatusProps][])

class ChatPaneContainer extends React.PureComponent<IChatPaneContainerProps> {
  public render() {
    const { members, messages } = this.props.chat

    const chatMessages: IChatMessageProps[] = messages.map(msg => {
      const fromUser = members.get(msg.from)

      return {
        key: msg.id,
        avatar: !msg.mine && { src: fromUser.avatar, status: statusMap.get(fromUser.status) },
        content: msg.content,
        mine: msg.mine,
        tabIndex: 0,
      }
    })

    return (
      chatMessages &&
      chatMessages.length > 0 && (
        <Scrollbars ref={this.handleScrollRef}>
          <Chat messages={chatMessages} styles={{ root: { padding: '0 32px 0 22px' } }} />
        </Scrollbars>
      )
    )
  }

  private handleScrollRef(scrollRef: Scrollbars) {
    if (scrollRef) {
      scrollRef.scrollToBottom()
    }
  }
}

export default ChatPaneContainer
