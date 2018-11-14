import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import { Chat, Divider } from '@stardust-ui/react'
import { ICSSInJSStyle } from 'types/theme'
import { IChat, ChatItemType, generateChatProps } from './services'

export interface IChatPaneContainerProps {
  chat: IChat
}

const ariaLive: ICSSInJSStyle = {
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0px',
  width: '1px',
  position: 'absolute',
}

class ChatPaneContainer extends React.PureComponent<IChatPaneContainerProps> {
  public render() {
    const chat = this.props.chat
    const items = this.generateChatItems(chat)

    return (
      items.length > 0 && (
        <Scrollbars ref={this.handleScrollRef}>
          <Chat
            role="main"
            aria-label={`${chat.title} chat content.`}
            items={items}
            styles={{ padding: '0 32px' }}
          />
        </Scrollbars>
      )
    )
  }

  private getMessagePreviewForScreenReader(props) {
    // Show the first 100 characters from the message
    const messageText = props.text || ''
    let messagePreview
    // making it shorter for 60 char. otherwise NVDA was splitting it into 2 lines
    if (messageText.length > 60) {
      messagePreview = `${messageText.slice(0, 60)} ..., by ${props.author} `
      return messagePreview
    }
    messagePreview = `${messageText} ..., by ${props.author}`
    return messagePreview
  }

  private generateChatItems(chat: IChat): JSX.Element[] {
    return generateChatProps(chat).map(({ itemType, ...props }, index) => {
      const ElementType = this.getElementType(itemType)
      const newProps = { ...props, text: undefined }
      return (
        <Chat.Item key={`chat-item-${index}`}>
          {itemType === ChatItemType.message && (
            <div style={ariaLive} role="heading" aria-level={4}>
              {this.getMessagePreviewForScreenReader(props)}
            </div>
          )}
          <ElementType {...newProps} />
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
