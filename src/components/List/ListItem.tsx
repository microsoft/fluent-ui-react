import * as React from 'react'

import * as PropTypes from 'prop-types'
import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import ItemLayout from '../ItemLayout/ItemLayout'
import { listItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { FocusableItemProps } from '../../lib/accessibility/FocusHandling/FocusableItem'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
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

class ListItem extends UIComponent<Extendable<ListItemProps>, any> {
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

  private itemRef = React.createRef<HTMLElement>()

  componentDidUpdate() {
    // This needs to be as part of issue https://github.com/stardust-ui/react/issues/370
    // this.focusableItem.tryFocus(ReactDOM.findDOMNode(this.itemRef.current) as HTMLElement)
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
        debug={debug}
        selection={selection}
        styles={styles.root}
        media={{
          styles: styles.media,
          content: media,
        }}
        header={{
          content: header,
          styles: styles.header,
          truncate: truncateHeader,
        }}
        headerMedia={{
          content: headerMedia,
          styles: styles.headerMedia,
        }}
        content={{
          content,
          styles: styles.content,
          truncate: truncateContent,
        }}
        contentMedia={{
          content: contentMedia,
        }}
        endMedia={{
          content: endMedia,
        }}
        truncateContent={truncateContent}
        truncateHeader={truncateHeader}
        ref={this.itemRef}
        {...accessibility.attributes.root}
        {...rest}
      />
    )
  }
}

ListItem.create = createShorthandFactory(ListItem, main => ({ main }))

export default ListItem
