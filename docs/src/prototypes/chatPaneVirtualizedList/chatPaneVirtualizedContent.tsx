import * as React from 'react'
import * as _ from 'lodash'
import { Chat } from '@stardust-ui/react'

import { IChat, generateChatItems } from '../chatPane/services'

import {
  List as VirtualizedList,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
  ListRowProps,
  OverscanIndexRange,
  IndexRange,
  ScrollParams,
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
    minHeight: 42,
    fixedWidth: true,
  })

  private overscanRowCount = 20

  public render() {
    const chatItems: JSX.Element[] = generateChatItems(this.props.chat)
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
              onScroll={this.onScroll}
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
      }
    })

    this.mostRecentStopIndex = stopIndex
  }

  private onScroll = (scrollParams: ScrollParams) => {
    const { scrollHeight, scrollTop } = scrollParams
    if (this.isCacheInitialized) {
      const changeInScrollHeight = scrollHeight - this.mostRecentScrollHeight

      if (
        this.listRef &&
        this.mostRecentStopIndex !== this.chatItemsLength - 1 &&
        changeInScrollHeight !== 0
      ) {
        this.listRef.scrollToPosition(scrollTop + changeInScrollHeight)
      }
    }

    this.mostRecentScrollHeight = scrollHeight
  }

  private setCacheAsInitialized = () => {
    this.isCacheInitialized = true
  }

  private setListRef = (ref: VirtualizedList) => {
    this.listRef = ref
  }
}

export default ChatPaneVirtualizedListContainer
