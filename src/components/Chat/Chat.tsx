import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, customPropTypes, UIComponent } from '../../lib'
import ChatMessage from './ChatMessage'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import ChatBehavior from '../../lib/accessibility/Behaviors/Chat/ChatBehavior'
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

export interface IChatProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  children?: ReactChildren
  messages?: ItemShorthand[]
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * Props needed for the AutoSizer component
 */
interface IAutoSizer {
  height: number
  width: number
}
interface IOnRowsRendered extends OverscanIndexRange, IndexRange {}

class Chat extends UIComponent<Extendable<IChatProps>, any> {
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

  static className = 'ui-chat'

  static displayName = 'Chat'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    children: PropTypes.node,

    /** Shorthand array of messages. */
    messages: PropTypes.arrayOf(PropTypes.any),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'children',
    'className',
    'messages',
    'styles',
    'variables',
  ]

  static defaultProps = { accessibility: ChatBehavior as Accessibility, as: 'ul' }

  static Message = ChatMessage

  actionHandlers: AccessibilityActionHandlers = {
    focus: event => this.focusZone && this.focusZone.focus(),
  }

  public componentDidUpdate(prevProps: IChatProps) {
    const { messages } = this.props
    if (messages.length !== prevProps.messages.length) {
      this.clearCacheAtIndex(messages.length - 1)
      this.scrollToBottom()
    }
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, messages } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        style={{ height: '100%' }}
      >
        {messages &&
          messages.length > 0 && (
            <AutoSizer onResize={this.onAutoResize}>
              {({ width, height }: IAutoSizer) => (
                <VirtualizedList
                  deferredMeasurementCache={this.cache}
                  height={height}
                  messages={messages}
                  overscanRowCount={this.overscanRowCount}
                  onRowsRendered={this.onRowsRendered}
                  onScroll={this.onScroll}
                  ref={this.setListRef}
                  rowCount={messages.length}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.rowRenderer}
                  scrollToIndex={messages.length - 1}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
      </ElementType>
    )
  }

  private onAutoResize = () => {
    const { scrollTop } = this.props
    if (scrollTop !== null && scrollTop !== this.mostRecentScrollTop && this.isCacheInitialized) {
      this.listRef.scrollToPosition(this.props.scrollTop)
    }
  }

  private clearCacheAtIndex = (index = 0) => {
    this.cache.clear(index, 0)
  }

  private scrollToBottom = () => {
    if (this.listRef) {
      this.listRef.scrollToRow(this.props.messages.length - 1)
    }
  }

  private rowRenderer = ({ style, index, key, parent }: ListRowProps) => {
    const { messages } = this.props
    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        <div style={style}>
          {ChatMessage.create(messages[index], { generateKey: true /**defaultProps: { style }**/ })}
        </div>
      </CellMeasurer>
    )
  }

  private onScroll = (scrollParams: ScrollParams) => {
    const { scrollHeight, scrollTop } = scrollParams
    const messagesLength = this.props.messages.length

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
      const messagesLength = this.props.messages.length
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

export default Chat
