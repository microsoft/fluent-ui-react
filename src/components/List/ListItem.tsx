import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
} from '../../lib'
import ItemLayout from '../ItemLayout/ItemLayout'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ReactProps, ComponentEventHandler } from '../../../types/utils'

export interface ListItemProps extends UIComponentProps, ContentComponentProps<any> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listItemBehavior
   * */
  accessibility?: Accessibility
  contentMedia?: any
  /** Toggle debug mode. */
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean
  media?: any

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
}

/**
 * A list item contains a single piece of content within a list.
 */
class ListItem extends UIComponent<ReactProps<ListItemProps>> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
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
    selected: PropTypes.bool,

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    accessibility: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
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

  renderComponent({ classes, accessibility, rest, styles }) {
    const {
      as,
      debug,
      endMedia,
      media,
      content,
      contentMedia,
      header,
      headerMedia,
      truncateContent,
      truncateHeader,
    } = this.props

    return (
      <ItemLayout
        as={as}
        className={classes.root}
        rootCSS={styles.root}
        content={content}
        contentMedia={contentMedia}
        debug={debug}
        endMedia={endMedia}
        header={header}
        headerMedia={headerMedia}
        media={media}
        mediaCSS={styles.media}
        truncateContent={truncateContent}
        truncateHeader={truncateHeader}
        headerCSS={styles.header}
        headerMediaCSS={styles.headerMedia}
        contentCSS={styles.content}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, 'content')

export default ListItem
