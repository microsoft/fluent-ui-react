import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import { customPropTypes, childrenExist, UIComponent } from '../../lib'
import ListItem from './ListItem'
import { listBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ContainerFocusHandler } from '../../lib/accessibility/FocusHandling/FocusContainer'

import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import {
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

export interface ListProps {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  className?: string
  debug?: boolean
  items?: ShorthandValue[]
  listRef?: (node: HTMLElement) => void
  selection?: boolean
  truncateContent?: boolean
  truncateHeader?: boolean
  renderItem?: ShorthandRenderFunction
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A list displays a group of related content.
 */
class List extends UIComponent<Extendable<ListProps>, any> {
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

    /** Ref callback with the list DOM node. */
    listRef: PropTypes.func,

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

  private focusHandler: ContainerFocusHandler = null
  private itemRefs = []

  private handleListRef = (listNode: HTMLElement) => {
    _.invoke(this.props, 'listRef', listNode)
  }

  actionHandlers: AccessibilityActionHandlers = {
    moveNext: e => {
      e.preventDefault()
      this.focusHandler.moveNext()
    },
    movePrevious: e => {
      e.preventDefault()
      this.focusHandler.movePrevious()
    },
    moveFirst: e => {
      e.preventDefault()
      this.focusHandler.moveFirst()
    },
    moveLast: e => {
      e.preventDefault()
      this.focusHandler.moveLast()
    },
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
        ref={this.handleListRef}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  componentDidMount() {
    this.focusHandler = new ContainerFocusHandler(
      () => this.props.items.length,
      index => {
        const targetComponent = this.itemRefs[index] && this.itemRefs[index].current
        const targetDomNode = ReactDOM.findDOMNode(targetComponent) as any

        targetDomNode && targetDomNode.focus()
      },
    )
  }

  renderItems() {
    const { items, renderItem } = this.props

    this.itemRefs = []
    return _.map(items, (item, idx) => {
      const maybeSelectableItemProps = {} as any

      if (this.props.selection) {
        const ref = React.createRef()
        this.itemRefs[idx] = ref

        maybeSelectableItemProps.tabIndex = 0
        maybeSelectableItemProps.ref = ref
        maybeSelectableItemProps.onFocus = () => this.focusHandler.syncFocusedItemIndex(idx)
      }

      const itemProps = {
        ..._.pick(this.props, List.itemProps),
        ...maybeSelectableItemProps,
      }

      return ListItem.create(item, {
        defaultProps: itemProps,
        render: renderItem,
      })
    })
  }
}

export default List
