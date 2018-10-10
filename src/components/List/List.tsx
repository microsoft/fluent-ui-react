import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import ListItem from './ListItem'
import { listBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

export interface IListProps {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  className?: string
  debug?: boolean
  items?: ShorthandValue[]
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  renderItem?: ShorthandRenderFunction
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

class List extends UIComponent<Extendable<IListProps>, any> {
  static displayName = 'List'

  static className = 'ui-list'

  static propTypes = {
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
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
    accessibility: PropTypes.func,

    /**
     * A custom render iterator for rendering each of the List items.
     * The default component, props, and children are available for each item.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderItem: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'ul',
    accessibility: listBehavior as Accessibility,
  }

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  renderItems() {
    const { items, renderItem } = this.props
    const itemProps = _.pick(this.props, List.itemProps)

    return _.map(items, item => {
      return ListItem.create(item, { defaultProps: itemProps, render: renderItem })
    })
  }
}

export default List
