import { Accessibility, listItemBehavior } from '@fluentui/accessibility'
import cx from 'classnames'
import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../utils'
import { ShorthandValue, WithAsProp, ComponentEventHandler, withSafeTypeForAs } from '../../types'
import Box, { BoxProps } from '../Box/Box'

export interface ListItemSlotClassNames {
  header: string
  headerMedia: string
  headerWrapper: string
  content: string
  contentMedia: string
  contentWrapper: string
  main: string
  media: string
  endMedia: string
}

export interface ListItemProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility
  contentMedia?: ShorthandValue<BoxProps>
  /** Toggle debug mode. */
  debug?: boolean
  header?: ShorthandValue<BoxProps>
  endMedia?: ShorthandValue<BoxProps>
  headerMedia?: ShorthandValue<BoxProps>

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean
  media?: ShorthandValue<BoxProps>

  index?: number
  /** A list item can indicate that it can be selected. */
  selectable?: boolean

  /** A list item can indicate that it can be navigable. */
  navigable?: boolean

  /** Indicates if the current list item is selected. */
  selected?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<ListItemProps>
}

class ListItem extends UIComponent<WithAsProp<ListItemProps>> {
  static create: ShorthandFactory<ListItemProps>

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
    navigable: PropTypes.bool,
    index: PropTypes.number,
    selected: PropTypes.bool,

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    onClick: PropTypes.func,
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
  }

  actionHandlers = {
    performClick: event => {
      this.handleClick(event)
      event.preventDefault()
    },
  }

  handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles }) {
    const { endMedia, media, content, contentMedia, header, headerMedia } = this.props

    const contentElement = Box.create(content, {
      defaultProps: () => ({
        className: ListItem.slotClassNames.content,
        styles: styles.content,
      }),
    })
    const contentMediaElement = Box.create(contentMedia, {
      defaultProps: () => ({
        className: ListItem.slotClassNames.contentMedia,
        styles: styles.contentMedia,
      }),
    })
    const headerElement = Box.create(header, {
      defaultProps: () => ({
        className: ListItem.slotClassNames.header,
        styles: styles.header,
      }),
    })
    const headerMediaElement = Box.create(headerMedia, {
      defaultProps: () => ({
        className: ListItem.slotClassNames.headerMedia,
        styles: styles.headerMedia,
      }),
    })
    const endMediaElement = Box.create(endMedia, {
      defaultProps: () => ({
        className: ListItem.slotClassNames.endMedia,
        styles: styles.endMedia,
      }),
    })
    const mediaElement = Box.create(media, {
      defaultProps: () => ({
        className: ListItem.slotClassNames.media,
        styles: styles.media,
      }),
    })

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {mediaElement}

        <div className={cx(ListItem.slotClassNames.main, classes.main)}>
          {(headerElement || headerMediaElement) && (
            <div className={cx(ListItem.slotClassNames.headerWrapper, classes.headerWrapper)}>
              {headerElement}
              {headerMediaElement}
            </div>
          )}
          {(contentElement || contentMediaElement) && (
            <div className={cx(ListItem.slotClassNames.contentWrapper, classes.contentWrapper)}>
              {contentElement}
              {contentMediaElement}
            </div>
          )}
        </div>

        {endMediaElement}
      </ElementType>
    )
  }
}

ListItem.create = createShorthandFactory({ Component: ListItem })
ListItem.slotClassNames = {
  header: `${ListItem.className}__header`,
  headerMedia: `${ListItem.className}__headerMedia`,
  headerWrapper: `${ListItem.className}__headerWrapper`,
  main: `${ListItem.className}__main`,
  content: `${ListItem.className}__content`,
  contentMedia: `${ListItem.className}__contentMedia`,
  contentWrapper: `${ListItem.className}__contentWrapper`,
  media: `${ListItem.className}__media`,
  endMedia: `${ListItem.className}__endMedia`,
}

/**
 * A ListItem contains a single piece of content within a List.
 */
export default withSafeTypeForAs<typeof ListItem, ListItemProps, 'li'>(ListItem)
