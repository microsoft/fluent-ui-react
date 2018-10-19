import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as PropTypes from 'prop-types'
import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout/ItemLayout'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  FocusableItem,
  FocusableItemProps,
} from '../../lib/accessibility/FocusHandling/FocusableItem'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import { Extendable } from '../../../types/utils'

export interface ListItemProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
  focusableItemProps?: FocusableItemProps
  header?: any
  endMedia?: any
  headerMedia?: any
  important?: boolean
  media?: any
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

export interface ListItemState {
  isHovering: boolean
}

class ListItem extends UIComponent<Extendable<ListItemProps>, ListItemState> {
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

  constructor(props: ListItemProps) {
    super(props, null)

    this.state = {
      isHovering: false,
    }
  }

  private itemRef = React.createRef<HTMLElement>()

  private focusableItem = FocusableItem.create(this)

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

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

    const { isHovering } = this.state
    const endArea = isHovering && endMedia

    const hoveringSelectionCSS = selection && isHovering ? { color: 'inherit' } : {}

    const headerCSS = {
      ...styles.header,
      ...hoveringSelectionCSS,
    }
    const headerMediaCSS = {
      ...styles.headerMedia,
      ...hoveringSelectionCSS,
    }
    const contentCSS = {
      ...styles.content,
      ...hoveringSelectionCSS,
    }

    return (
      <ItemLayout
        as={as}
        className={classes.root}
        rootCSS={styles.root}
        content={content}
        contentMedia={!isHovering && contentMedia}
        debug={debug}
        endMedia={endArea}
        header={header}
        headerMedia={headerMedia}
        media={media}
        mediaCSS={styles.media}
        selection={selection}
        truncateContent={truncateContent}
        truncateHeader={truncateHeader}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        headerCSS={headerCSS}
        headerMediaCSS={headerMediaCSS}
        contentCSS={contentCSS}
        ref={this.itemRef}
        {...accessibility.attributes.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, main => ({ main }))

export default ListItem
