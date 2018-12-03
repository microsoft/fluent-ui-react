import * as React from 'react'

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
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps } from '../../../types/utils'

export interface ListItemProps extends UIComponentProps, ContentComponentProps<any> {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listItemBehavior
   * */
  accessibility?: Accessibility
  contentMedia?: any
  /** Toggle debug mode */
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean
  media?: any

  /** A list item can indicate that it can be selected. */
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
}

export interface ListItemState {
  isHovering: boolean
}

/**
 * A list item contains a single piece of content within a list.
 */
class ListItem extends UIComponent<ReactProps<ListItemProps>, ListItemState> {
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

    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    accessibility: PropTypes.func,
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
  }

  constructor(props: ListItemProps) {
    super(props, null)

    this.state = {
      isHovering: false,
    }
  }

  private itemRef = React.createRef<HTMLElement>()

  renderComponent({ ElementType, classes, accessibility, rest, styles }) {
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
        ref={this.itemRef}
        {...accessibility.attributes.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, 'content')

export default ListItem
