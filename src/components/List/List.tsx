import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import { customPropTypes, childrenExist, UIComponent } from '../../lib'
import ListItem from './ListItem'
import Ref from '../Ref/Ref'
import { listBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ContainerFocusHandler } from '../../lib/accessibility/FocusHandling/FocusContainer'

import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'

export interface ListProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listBehavior
   * */
  accessibility?: Accessibility

  /** Toggle debug mode */
  debug?: boolean

  /** Shorthand array of props for ListItem. */
  items?: ShorthandValue[]

  /**
   * Ref callback with the list DOM node.
   *
   * @param {JSX.Element} node - list DOM node.
   */
  listRef?: (node: HTMLElement) => void

  /** A selection list formats list items as possible choices. */
  selection?: boolean

  /** Truncates content */
  truncateContent?: boolean

  /** Truncates header */
  truncateHeader?: boolean

  /**
   * A custom render iterator for rendering each of the List items.
   * The default component, props, and children are available for each item.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction
}

export interface ListState {
  selectedItemIndex: number
}

/**
 * A list displays a group of related content.
 */
class List extends UIComponent<Extendable<ListProps>, ListState> {
  static displayName = 'List'

  static className = 'ui-list'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    accessibility: PropTypes.func,
    debug: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    listRef: PropTypes.func,
    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,
    renderItem: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: listBehavior as Accessibility,
  }

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  public state = {
    selectedItemIndex: 0,
  }

  private focusHandler: ContainerFocusHandler = null
  private itemRefs = []

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
      <Ref
        innerRef={(listNode: HTMLElement) => {
          _.invoke(this.props, 'listRef', listNode)
        }}
      >
        <ElementType
          {...accessibility.attributes.root}
          {...accessibility.keyHandlers.root}
          {...rest}
          className={classes.root}
        >
          {childrenExist(children) ? children : this.renderItems()}
        </ElementType>
      </Ref>
    )
  }

  componentDidMount() {
    this.focusHandler = new ContainerFocusHandler(
      () => this.props.items.length,
      index => {
        this.setState({ selectedItemIndex: index }, () => {
          const targetComponent = this.itemRefs[index] && this.itemRefs[index].current
          const targetDomNode = ReactDOM.findDOMNode(targetComponent) as any

          targetDomNode && targetDomNode.focus()
        })
      },
    )
  }

  renderItems() {
    const { items, renderItem } = this.props
    const { selectedItemIndex } = this.state

    this.itemRefs = []

    return _.map(items, (item, idx) => {
      const maybeSelectableItemProps = {} as any

      if (this.props.selection) {
        const ref = React.createRef()
        this.itemRefs[idx] = ref

        maybeSelectableItemProps.tabIndex = idx === selectedItemIndex ? 0 : -1
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
