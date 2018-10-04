import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import { Chat, Divider } from '@stardust-ui/react'

import { IChat, ChatItemType, generateChatProps } from './services'

export interface IChatPaneContainerProps {
  chat: IChat
}

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
    return generateChatProps(chat).map(({ itemType, ...props }, index) => {
      const ElementType = this.getElementType(itemType)
      return (
        <Chat.Item key={`chat-item-${index}`}>
          <ElementType {...props} />
        </Chat.Item>
      )
    })
  }

  private getElementType = (itemType: ChatItemType) => {
    switch (itemType) {
      case ChatItemType.message:
        return Chat.Message
      case ChatItemType.divider:
        return Divider
    }
  }

  private handleScrollRef(scrollRef: Scrollbars) {
    if (scrollRef) {
      scrollRef.scrollToBottom()
    }
  }
}

export default ChatPaneContainer
