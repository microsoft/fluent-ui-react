import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { customPropTypes, childrenExist, UIComponent } from '../../lib'
import ListItem from './ListItem'
import { ListBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import {
  ContainerFocusHandler,
  IFocusContainerProps,
  IFocusContainerState,
} from '../../lib/accessibility/FocusHandling/FocusContainer'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'

export interface IListProps extends IFocusContainerProps<ItemShorthand> {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  className?: string
  debug?: boolean
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class List extends UIComponent<Extendable<IListProps>, IFocusContainerState> {
  static displayName = 'List'

  static className = 'ui-list'

  static propTypes = {
    as: customPropTypes.as,

    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: customPropTypes.collectionShorthand,

    /** A selection list formats list items as possible choices. */
    selection: PropTypes.bool,

    /** Truncates content */
    truncateContent: PropTypes.bool,

    /** Truncates header */
    truncateHeader: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'ul',
    accessibility: ListBehavior as Accessibility,
  }

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  private containerFocusHandler = new ContainerFocusHandler(
    () => this.props,
    this.setState.bind(this),
    s => {
      this.state = s
    },
    () => this.state,
  )

  actionHandlers: AccessibilityActionHandlers = {
    moveNext: this.containerFocusHandler.moveNext.bind(this.containerFocusHandler),
    movePrevious: this.containerFocusHandler.movePrevious.bind(this.containerFocusHandler),
    moveFirst: this.containerFocusHandler.moveFirst.bind(this.containerFocusHandler),
    moveLast: this.containerFocusHandler.moveLast.bind(this.containerFocusHandler),
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  renderItems() {
    const { items } = this.props
    const itemProps = _.pick(this.props, List.itemProps)

    return _.map(items, (item, idx) => {
      itemProps.focusableItemProps = this.containerFocusHandler.assignAtomicItemsProps(
        idx,
        items.length,
      )

      return ListItem.create(item, {
        defaultProps: itemProps,
      })
    })
  }
}

export default List
