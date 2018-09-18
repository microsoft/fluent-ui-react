import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { customPropTypes, childrenExist, UIComponent } from '../../lib'
import ListItem from './ListItem'
import { ListBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import {
  ContainerFocusHandler,
  IContainerProps,
  IContainerState,
} from '../../lib/accessibility/FocusHandling/ContainerFocusHandler'

import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'

export interface IListProps extends IContainerProps<ItemShorthand> {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  className?: string
  debug?: boolean
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class List extends UIComponent<Extendable<IListProps>, IContainerState> {
  static displayName = 'List'

  static className = 'ui-list'

  static propTypes = {
    as: customPropTypes.as,

    children: PropTypes.node,

    /** Additional classes. */
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

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'ul',
    accessibility: ListBehavior as Accessibility,
  }

  static handledProps = [
    'accessibility',
    'as',
    'children',
    'className',
    'debug',
    'items',
    'selection',
    'styles',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  private containerFocusHandler = new ContainerFocusHandler(this.props, this.state, this)

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  renderItems() {
    const { items } = this.props
    const itemProps = _.pick(this.props, List.itemProps)

    return _.map(items, (item, idx) => {
      itemProps.atomicItemProps = this.containerFocusHandler.assignAtomicItemsProps(
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
