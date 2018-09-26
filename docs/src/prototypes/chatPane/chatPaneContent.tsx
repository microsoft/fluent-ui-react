import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Chat, ChatMessage } from '@stardust-ui/react'

import { IChat, UserStatus } from './data/interfaces'
import { IChatMessageProps } from 'src/components/Chat'
import { IStatusProps } from 'src/components/Status/Status'
import { Extendable } from 'utils'

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

type StatusProps = Extendable<IStatusProps>

const statusMap: Map<UserStatus, StatusProps> = new Map([
  ['Available', { color: 'green', icon: 'check', title: 'Available' }],
  ['DoNotDisturb', { color: 'red', icon: 'minus', title: 'Do not disturb' }],
  ['Away', { color: 'yellow', icon: 'clock', title: 'Away' }],
  ['Offline', { color: 'grey', title: 'Offline' }],
] as [UserStatus, StatusProps][])

class ChatPaneContainer extends React.PureComponent<IChatPaneContainerProps> {
  private listRef: VirtualizedList
  private mostRecentStopIndex: number
  private mostRecentScrollHeight: number
  private mostRecentScrollTop: number
  private isCacheInitialized = false

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
    const { members, messages } = this.props.chat

    const chatMessages: IChatMessageProps[] = messages.map(msg => {
      const fromUser = members.get(msg.from)

      return {
        key: msg.id,
        avatar: !msg.mine && { src: fromUser.avatar, status: statusMap.get(fromUser.status) },
        content: msg.content,
        mine: msg.mine,
        tabIndex: 0,
        author: fromUser && `${fromUser.firstName} ${fromUser.lastName}`,
        timestamp: msg.date.toDateString(),
      }
    })

    return (
      chatMessages &&
      chatMessages.length > 0 && (
        <AutoSizer>
          {({ width, height }: IAutoSizer) => (
            <Chat
              as={VirtualizedList}
              styles={{ padding: '0 32px', display: 'block' }}
              deferredMeasurementCache={this.cache}
              height={height}
              overscanRowCount={this.overscanRowCount}
              onRowsRendered={this.onRowsRendered}
              onScroll={this.onScroll}
              chatRef={this.setListRef}
              rowCount={chatMessages.length}
              rowHeight={this.cache.rowHeight}
              rowRenderer={this.rowRenderer.bind(this, chatMessages)}
              scrollToIndex={chatMessages.length - 1}
              width={width}
            />
          )}
        </AutoSizer>
      )
    )
  }

  private rowRenderer = (
    chatMessages: IChatMessageProps[],
    { style, index, key, parent }: ListRowProps,
  ) => {
    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        <div style={style}>{ChatMessage.create(chatMessages[index], { generateKey: true })}</div>
      </CellMeasurer>
    )
  }

  private clearCacheAtIndex = (index = 0) => {
    this.cache.clear(index, 0)
  }

  private scrollToBottom = () => {
    if (this.listRef) {
      this.listRef.scrollToRow(this.props.chat.messages.length - 1)
    }
  }

  private onScroll = (scrollParams: ScrollParams) => {
    const { scrollHeight, scrollTop } = scrollParams
    const messagesLength = this.props.chat.messages.length

    if (this.isCacheInitialized) {
      const changeInScrollHeight = scrollHeight - this.mostRecentScrollHeight

      if (
        this.listRef &&
        this.mostRecentStopIndex !== messagesLength - 1 &&
        changeInScrollHeight !== 0
      ) {
        this.listRef.scrollToPosition(scrollTop + changeInScrollHeight)
      }
    }

    this.mostRecentScrollHeight = scrollHeight
    this.mostRecentScrollTop = scrollTop
  }

  private onRowsRendered = ({ stopIndex }: IOnRowsRendered) => {
    window.requestAnimationFrame(() => {
      const messagesLength = this.props.chat.messages.length
      if (
        !this.isCacheInitialized &&
        this.mostRecentStopIndex === messagesLength - 1 &&
        messagesLength > this.overscanRowCount
      ) {
        this.listRef.scrollToPosition(this.mostRecentScrollHeight - 1)
        this.listRef.scrollToRow(messagesLength - 1)

        this.setCacheAsInitialized()
      } else if (!this.isCacheInitialized && messagesLength <= this.overscanRowCount) {
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

export default ChatPaneContainer
