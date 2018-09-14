import * as _ from 'lodash'
import * as React from 'react'
import * as PropTypes from 'prop-types'

import { customPropTypes, UIComponent, childrenExist } from '../../lib'
import ListItem from './ListItem'
import { ListBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'

export interface IListProps {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  className?: string
  debug?: boolean
  items?: ItemShorthand[]
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

interface IContainerState {
  focusItemOnIdx: number
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

  constructor(props: IListProps, state: IContainerState) {
    super(props, state)

    this.state = {
      focusItemOnIdx: 0,
    }
  }

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
      const isFocused = idx === this.state.focusItemOnIdx && this.state.focusItemOnIdx !== -1

      itemProps.idx = idx
      itemProps.isFocused = isFocused

      itemProps.isFirstElement = idx === 0
      itemProps.isLastElement = idx === items.length - 1
      itemProps.onMovePrevious = this.movePrevious.bind(this)
      itemProps.onMoveNext = this.moveNext.bind(this)
      itemProps.onMoveFirst = this.moveFirst.bind(this)
      itemProps.onMoveLast = this.moveLast.bind(this)
      itemProps.onEnter = this.enter.bind(this)
      itemProps.onSpace = this.space.bind(this)
      itemProps.onEsc = this.esc.bind(this)

      return ListItem.create(item, { defaultProps: itemProps })
    })
  }

  private movePrevious(): void {
    this.setState({
      focusItemOnIdx: this.state.focusItemOnIdx - 1,
    })
    console.log('movePrevious() - active index changed: ' + this.state.focusItemOnIdx)
  }

  private moveNext(): void {
    this.setState({
      focusItemOnIdx: this.state.focusItemOnIdx + 1,
    })
    console.log('moveNext() - active index changed: ' + this.state.focusItemOnIdx)
  }

  private moveFirst(): void {
    this.setState({
      focusItemOnIdx: 0,
    })
    console.log('moveFirst() - active index changed: ' + this.state.focusItemOnIdx)
  }

  private moveLast(): void {
    this.setState({
      focusItemOnIdx: this.props.items.length - 1,
    })
    console.log('moveLast() - active index changed: ' + this.state.focusItemOnIdx)
  }

  private enter(): void {
    console.log('enter()')
  }

  private space(): void {
    console.log('space()')
  }

  private esc(): void {
    console.log('esc()')
  }
}

export default List
