import * as React from 'react'
import * as _ from 'lodash'
import { Chat, Divider } from '@stardust-ui/react'

import { IChat, ChatItemType, generateChatProps } from '../chatPane/services'

import {
  List as VirtualizedList,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
  ListRowProps,
  OverscanIndexRange,
  IndexRange,
} from 'react-virtualized'

export interface IChatPaneContainerProps {
  chat: IChat
}

interface IAutoSizer {
  height: number
  width: number
}
interface IOnRowsRendered extends OverscanIndexRange, IndexRange {}

class ChatPaneVirtualizedListContainer extends React.PureComponent<IChatPaneContainerProps> {
  private listRef: VirtualizedList
  private mostRecentStopIndex: number
  private mostRecentScrollHeight: number
  private isCacheInitialized = false
  private chatItemsLength: number

  private cache = new CellMeasurerCache({
    minHeight: 36,
    fixedWidth: true,
  })

  private overscanRowCount = 10

  public componentDidUpdate(prevProps: IChatPaneContainerProps) {
    const { messages } = this.props.chat
    const prevMessages = prevProps.chat.messages
    if (messages.length !== prevMessages.length) {
      this.clearCacheAtIndex(messages.length - 1)
      this.scrollToBottom()
    }
  }

  public render() {
    const chatItems: JSX.Element[] = this.generateChatItems(this.props.chat)
    this.chatItemsLength = chatItems.length

    return (
      this.chatItemsLength > 0 && (
        <AutoSizer>
          {({ width, height }: IAutoSizer) => (
            <Chat
              as={VirtualizedList}
              styles={{ padding: '0 32px', display: 'block' }}
              deferredMeasurementCache={this.cache}
              height={height}
              overscanRowCount={this.overscanRowCount}
              onRowsRendered={this.onRowsRendered}
              chatRef={this.setListRef}
              rowCount={this.chatItemsLength}
              rowHeight={this.cache.rowHeight}
              rowRenderer={this.rowRenderer.bind(this, chatItems)}
              scrollToIndex={this.chatItemsLength - 1}
              width={width}
            />
          )}
        </AutoSizer>
      )
    )
  }

  private rowRenderer = (chatItems: JSX.Element[], { style, index, key, parent }: ListRowProps) => {
    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        <div style={style}>{chatItems[index]}</div>
      </CellMeasurer>
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

  private clearCacheAtIndex = (index = 0) => {
    this.cache.clear(index, 0)
  }

  private scrollToBottom = () => {
    if (this.listRef) {
      this.listRef.scrollToRow(this.chatItemsLength - 1)
    }
  }

  private onRowsRendered = ({ stopIndex }: IOnRowsRendered) => {
    window.requestAnimationFrame(() => {
      if (
        !this.isCacheInitialized &&
        this.mostRecentStopIndex === this.chatItemsLength - 1 &&
        this.chatItemsLength > this.overscanRowCount
      ) {
        this.listRef.scrollToPosition(this.mostRecentScrollHeight - 1)
        this.listRef.scrollToRow(this.chatItemsLength - 1)

        this.setCacheAsInitialized()
      } else if (!this.isCacheInitialized && this.chatItemsLength <= this.overscanRowCount) {
        this.setCacheAsInitialized()
      }
    })

    this.mostRecentStopIndex = stopIndex
  }

  private setCacheAsInitialized = () => {
    this.isCacheInitialized = true
  }

  private setListRef = (ref: VirtualizedList) => {
    this.listRef = ref
  }
}

export default ChatPaneVirtualizedListContainer
