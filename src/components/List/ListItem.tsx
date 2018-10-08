import * as React from 'react'
import * as PropTypes from 'prop-types'
import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export interface IListItemProps {
  accessibility?: Accessibility
  as?: any
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
  endMedia?: any
  header?: any
  headerMedia?: any
  important?: boolean
  media?: any
  selected?: boolean
  selection?: boolean
  styles?: ComponentPartStyle
  truncateContent?: boolean
  truncateHeader?: boolean
  variables?: ComponentVariablesInput
}

class ListItem extends UIComponent<Extendable<IListItemProps>, any> {
  static create: Function

  static displayName = 'ListItem'

  static className = 'ui-list__item'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,

    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    contentMedia: PropTypes.any,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    endMedia: PropTypes.any,
    header: PropTypes.any,
    headerMedia: PropTypes.any,

    /** A list item can appear more important and draw the user's attention. */
    important: PropTypes.bool,
    media: PropTypes.any,

    /** A list item can indicate that it is selected. */
    selected: PropTypes.bool,

    /** A list item can indicate that it can be selected. */
    selection: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'li',
    accessibility: listItemBehavior as Accessibility,
  }

  state: any = {}

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
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
      selected,
      selection,
      truncateContent,
      truncateHeader,
    } = this.props

    const { isHovering } = this.state
    const endArea = isHovering && endMedia

    const hoveringSelectionCSS = selection && isHovering ? { color: 'inherit' } : {}
    const selectedCSS = selected ? { color: 'inherit' } : {}

    const headerCSS = {
      ...styles.header,
      ...hoveringSelectionCSS,
      ...selectedCSS,
    }
    const headerMediaCSS = {
      ...styles.headerMedia,
      ...hoveringSelectionCSS,
      ...selectedCSS,
    }
    const contentCSS = {
      ...styles.content,
      ...hoveringSelectionCSS,
      ...selectedCSS,
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
        {...accessibility.attributes.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, main => ({ main }))

export default ListItem
