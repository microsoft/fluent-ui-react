import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as PropTypes from 'prop-types'
import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout'
import { ListItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import {
  FocusableItem,
  IFocusableItemProps,
  IFocusableItemState,
} from '../../lib/accessibility/FocusHandling/FocusableItem'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export interface IListItemProps {
  accessibility?: Accessibility
  as?: any
  focusableItemProps?: IFocusableItemProps
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
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

export interface IListItemState extends IFocusableItemState {
  isHovering: boolean
}

class ListItem extends UIComponent<Extendable<IListItemProps>, IListItemState> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static propTypes = {
    as: customPropTypes.as,
    focusableItemProps: PropTypes.object,

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
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'className',
    'content',
    'contentMedia',
    'debug',
    'endMedia',
    'focusableItemProps',
    'header',
    'headerMedia',
    'important',
    'media',
    'selection',
    'styles',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static defaultProps = {
    as: 'li',
    accessibility: ListItemBehavior as Accessibility,
  }

  private itemRef = React.createRef<HTMLElement>()

  private focusableItem = new FocusableItem(
    () => this.props.focusableItemProps,
    this.setState.bind(this),
    state => {
      this.state = { ...{ isHovering: false }, ...state }
    },
  )

  actionHandlers: AccessibilityActionHandlers = {
    moveNext: this.focusableItem.moveNext.bind(this.focusableItem),
    movePrevious: this.focusableItem.movePrevious.bind(this.focusableItem),
    moveFirst: this.focusableItem.moveFirst.bind(this.focusableItem),
    moveLast: this.focusableItem.moveLast.bind(this.focusableItem),
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  componentDidUpdate() {
    this.focusableItem.focus(ReactDOM.findDOMNode(this.itemRef.current!) as HTMLElement)
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
        {...accessibility.keyHandlers.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, main => ({ main }))

export default ListItem
