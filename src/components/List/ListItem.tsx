import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as PropTypes from 'prop-types'
import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import {
  FocusableItem,
  IFocusableItemProps,
} from '../../lib/accessibility/FocusHandling/FocusableItem'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export interface IListItemProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
  focusableItemProps?: IFocusableItemProps
  header?: any
  endMedia?: any
  headerMedia?: any
  important?: boolean
  media?: any
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

export interface IListItemState {
  isHovering: boolean
}

class ListItem extends UIComponent<Extendable<IListItemProps>, IListItemState> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static propTypes = {
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    contentMedia: PropTypes.any,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    /** A list item can appear more important and draw the user's attention. */
    important: PropTypes.bool,
    media: PropTypes.any,

    /** A list item can indicate that it can be selected. */
    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,
    focusableItemProps: PropTypes.object,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
  }

  constructor(props: IListItemProps) {
    super(props, null)

    this.state = {
      isHovering: false,
    }
  }

  private itemRef = React.createRef<HTMLElement>()

  private focusableItem = FocusableItem.create(this)

  componentDidUpdate() {
    this.focusableItem.tryFocus(ReactDOM.findDOMNode(this.itemRef.current) as HTMLElement)
  }

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
      selection,
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
        selection={selection}
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

ListItem.create = createShorthandFactory(ListItem, main => ({ main }))

export default ListItem
