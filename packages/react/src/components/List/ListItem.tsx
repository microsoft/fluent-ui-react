import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  isFromKeyboard,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import Flex from '../Flex/Flex'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ShorthandValue, ReactProps, ComponentEventHandler } from '../../types'
import Box from '../Box/Box'

export interface ListItemSlotClassNames {
  header: string
  headerMedia: string
  main: string
  content: string
  contentMedia: string
  media: string
  endMedia: string
}

export interface ListItemProps extends UIComponentProps, ContentComponentProps<ShorthandValue> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listItemBehavior
   * */
  accessibility?: Accessibility
  contentMedia?: ShorthandValue
  /** Toggle debug mode. */
  debug?: boolean
  header?: ShorthandValue
  endMedia?: ShorthandValue
  headerMedia?: ShorthandValue

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean
  media?: ShorthandValue

  index?: number
  /** A list item can indicate that it can be selected. */
  selectable?: boolean

  /** Indicates if the current list item is selected. */
  selected?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ListItemProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ListItemProps>
}

export interface ListItemState {
  isFromKeyboard: boolean
}

/**
 * A list item contains a single piece of content within a list.
 */
class ListItem extends UIComponent<ReactProps<ListItemProps>, ListItemState> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static slotClassNames: ListItemSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    contentMedia: PropTypes.any,
    content: PropTypes.any,

    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    important: PropTypes.bool,
    media: PropTypes.any,

    selectable: PropTypes.bool,
    index: PropTypes.number,
    selected: PropTypes.bool,

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    onClick: PropTypes.func,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
  }

  state = {
    isFromKeyboard: false,
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => {
      this.handleClick(event)
      event.preventDefault()
    },
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  wrapWithFlex = (part: React.ReactNode, shouldWrap: boolean) =>
    shouldWrap ? <Flex gap="gap.smaller">{part}</Flex> : part

  renderComponent({ classes, accessibility, unhandledProps, styles }) {
    const { as, debug, endMedia, media, content, contentMedia, header, headerMedia } = this.props

    const contentElement = Box.create(content, {
      defaultProps: {
        className: ListItem.slotClassNames.content,
        styles: styles.content,
      },
    })
    const contentMediaElement = Box.create(contentMedia, {
      defaultProps: {
        className: ListItem.slotClassNames.contentMedia,
        styles: styles.contentMedia,
      },
    })
    const headerElement = Box.create(header, {
      defaultProps: {
        className: ListItem.slotClassNames.header,
        styles: styles.header,
      },
    })
    const headerMediaElement = Box.create(headerMedia, {
      defaultProps: {
        className: ListItem.slotClassNames.headerMedia,
        styles: styles.headerMedia,
      },
    })
    const endMediaElement = Box.create(endMedia, {
      defaultProps: {
        className: ListItem.slotClassNames.endMedia,
        styles: styles.endMedia,
      },
    })
    const mediaElement = Box.create(media, {
      defaultProps: {
        className: ListItem.slotClassNames.media,
        styles: styles.media,
      },
    })

    const hasHeaderPart = !!(headerElement || headerMediaElement)
    const headerPart = hasHeaderPart && (
      <>
        <Flex.Item grow>{headerElement}</Flex.Item>
        {headerMediaElement}
      </>
    )

    const hasContentPart = !!(contentElement || contentMediaElement)
    const contentPart = hasContentPart && (
      <>
        <Flex.Item grow>{contentElement}</Flex.Item>
        {contentMediaElement}
      </>
    )

    const hasBothParts = hasContentPart && hasHeaderPart

    return (
      <Flex
        vAlign="center"
        gap="gap.smaller"
        as={as}
        debug={debug}
        className={classes.root}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {mediaElement}

        <Flex.Item grow>
          <Flex
            className={ListItem.slotClassNames.main}
            column={hasBothParts}
            gap={hasBothParts ? undefined : 'gap.small'}
            styles={styles.main}
          >
            {this.wrapWithFlex(headerPart, hasBothParts)}
            {this.wrapWithFlex(contentPart, hasBothParts)}
          </Flex>
        </Flex.Item>
        {endMediaElement}
      </Flex>
    )
  }
}

ListItem.create = createShorthandFactory({ Component: ListItem, mappedProp: 'content' })
ListItem.slotClassNames = {
  header: `${ListItem.className}__header`,
  headerMedia: `${ListItem.className}__headerMedia`,
  main: `${ListItem.className}__main`,
  content: `${ListItem.className}__content`,
  contentMedia: `${ListItem.className}__contentMedia`,
  media: `${ListItem.className}__media`,
  endMedia: `${ListItem.className}__endMedia`,
}

export default ListItem
