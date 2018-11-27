import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Chat, Divider } from '@stardust-ui/react'
import { ChatData, ChatItemTypes, generateChatProps } from './services'

const screenReaderMessageContainerStyles: React.CSSProperties = {
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0px',
  width: '1px',
  position: 'absolute',
}

export interface ChatPaneContainerProps {
  chat: ChatData
}

class ChatPaneContainer extends React.PureComponent<ChatPaneContainerProps> {
  public render() {
    const { chat } = this.props
    const items = this.generateChatItems(chat)

    return (
      items.length > 0 && (
        <Scrollbars ref={this.handleScrollRef}>
          <Chat
            items={items}
            role="main"
            aria-label={`${chat.title} chat content.`}
            styles={{ padding: '0 32px' }}
          />
        </Scrollbars>
      )
    )
  }

  private generateChatItems(chat: ChatData): JSX.Element[] {
    return generateChatProps(chat).map(({ itemType, ...props }, index) => {
      const ElementType = this.getElementType(itemType)
      return (
        <Chat.Item key={`chat-item-${index}`}>
          {itemType === ChatItemTypes.message && (
            <div style={screenReaderMessageContainerStyles} role="heading" aria-level={4}>
              {this.getMessagePreviewForScreenReader(props)}
            </div>
          )}
          <ElementType {...props} text={undefined} />
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

  private getMessagePreviewForScreenReader(props) {
    // Show the first 60 characters from the message, as NVDA splits it into 2 lines if more is shown
    const messageText = props.text || ''
    return `${messageText.slice(0, 60)} ..., by ${props.author}`
  }
}

export default ChatPaneContainer
