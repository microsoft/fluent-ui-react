import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Chat, Divider, Avatar } from '@stardust-ui/react'
import { ChatData, ChatItemTypes, generateChatProps } from './services'
import style from './chatProtoStyle'

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
          <div
            role="main"
            aria-label="Message list. In forms mode: press Enter to explore message content, then use Escape to shift focus back to the message"
          >
            <div
              id="chat-pane-reader-text"
              style={style.screenReaderContainerStyles}
              role="heading"
              aria-level={2}
            >
              Message list.
            </div>
            <Chat items={items} styles={{ padding: '0 32px' }} />
          </div>
        </Scrollbars>
      )
    )
  }

  private generateChatItems(chat: ChatData): JSX.Element[] {
    return generateChatProps(chat).map(
      ({ mine, gutter, message: { itemType, ...props } }, index) => {
        const ElementType = this.getElementType(itemType)
        const maybeAttributesForDivider =
          itemType === ChatItemTypes.divider
            ? {
                role: 'heading',
                'aria-level': 3,
              }
            : {}
        return (
          <Chat.Item
            key={`chat-item-${index}`}
            contentPosition={mine ? 'end' : 'start'}
            gutter={gutter && { content: <Avatar {...gutter} /> }}
            message={{
              content: (
                <>
                  {itemType === ChatItemTypes.message && (
                    <div style={style.screenReaderContainerStyles} role="heading" aria-level={4}>
                      {this.getMessagePreviewForScreenReader(props)}
                    </div>
                  )}
                  <ElementType {...props} text={undefined} {...maybeAttributesForDivider} />
                </>
              ),
            }}
          />
        )
      },
    )
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
    /*  Show the first 44 characters from the message, reasons:
          - as NVDA splits it into 2 lines if more is shown
          - for announcements feature, messaging team went with 44 characters but that was not based on loc issues but some UI real estate issue.  */
    const messageText = props.text || ''
    return `${messageText.slice(0, 44)} ..., by ${
      typeof props.author === 'object' ? props.author.content : props.author
    }`
  }
}

export default ChatPaneContainer
