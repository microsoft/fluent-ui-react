import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import { Chat } from '@stardust-ui/react'
import { IChat, generateChatItems } from './services'

export interface IChatPaneContainerProps {
  chat: IChat
}

class ChatPaneContainer extends React.PureComponent<IChatPaneContainerProps> {
  public render() {
    const items = generateChatItems(this.props.chat)

    return (
      items.length > 0 && (
        <Scrollbars ref={this.handleScrollRef}>
          <Chat items={items} styles={{ padding: '0 32px' }} />
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
