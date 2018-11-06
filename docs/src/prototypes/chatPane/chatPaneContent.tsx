import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Chat, Divider } from '@stardust-ui/react'

import { ChatData, ChatItemTypes, generateChatProps } from './services'

export interface ChatPaneContainerProps {
  chat: ChatData
}

class ChatPaneContainer extends React.PureComponent<ChatPaneContainerProps> {
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

  private generateChatItems(chat: ChatData): JSX.Element[] {
    return generateChatProps(chat).map(({ itemType, ...props }, index) => {
      const ElementType = this.getElementType(itemType)
      return (
        <Chat.Item key={`chat-item-${index}`}>
          <ElementType {...props} />
        </Chat.Item>
      )
    })
  }

  private getElementType = (itemType: ChatItemTypes) => {
    switch (itemType) {
      case ChatItemTypes.message:
        return Chat.Message
      case ChatItemTypes.divider:
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
