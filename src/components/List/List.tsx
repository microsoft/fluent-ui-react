import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import {
  customPropTypes,
  childrenExist,
  AutoControlledComponent,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../lib'
import ListItem from './ListItem'
import { listBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ContainerFocusHandler } from '../../lib/accessibility/FocusHandling/FocusContainer'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../../types/utils'

export interface ListProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listBehavior
   * */
  accessibility?: Accessibility

  /** Toggle debug mode */
  debug?: boolean

  /** Shorthand array of props for ListItem. */
  items?: ShorthandValue[]

  /** A selectable list formats list items as possible choices. */
  selectable?: boolean

  /** Index of the currently selected item. */
  selectedIndex?: number

  /** Initial selectedIndex value. */
  defaultSelectedIndex?: number

  /**
   * Event for request to change 'selectedIndex' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onSelectedIndexChange?: ComponentEventHandler<ListProps>

  /** Truncates content */
  truncateContent?: boolean

  /** Truncates header */
  truncateHeader?: boolean
}

export interface ListState {
  focusedIndex: number
  selectedIndex?: number
}

/**
 * A list displays a group of related content.
 */
class List extends AutoControlledComponent<ReactProps<ListProps>, ListState> {
  static displayName = 'List'

  static className = 'ui-list'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.func,
    debug: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    selectable: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,
    selectedIndex: PropTypes.number,
    defaultSelectedIndex: PropTypes.number,
    onSelectedIndexChange: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: listBehavior as Accessibility,
  }

  static autoControlledProps = ['selectedIndex']
  getInitialAutoControlledState() {
    return { selectedIndex: -1, focusedIndex: 0 }
  }

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selectable', 'truncateContent', 'truncateHeader', 'variables']

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

  constructor(props, context) {
    super(props, context)

    this.focusHandler = new ContainerFocusHandler(
      () => this.props.items.length,
      index => {
        this.setState({ focusedIndex: index }, () => {
          const targetComponent = this.itemRefs[index] && this.itemRefs[index].current
          const targetDomNode = ReactDOM.findDOMNode(targetComponent) as any

          targetDomNode && targetDomNode.focus()
        })
      },
    )
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  renderItems() {
    const { items } = this.props
    const { focusedIndex, selectedIndex } = this.state

    this.focusHandler.syncFocusedIndex(focusedIndex)

    this.itemRefs = []

    return _.map(items, (item, idx) => {
      const maybeSelectableItemProps = {} as any

      if (this.props.selectable) {
        const ref = React.createRef()
        this.itemRefs[idx] = ref

        maybeSelectableItemProps.ref = ref
        maybeSelectableItemProps.onFocus = () => this.setState({ focusedIndex: idx })
        maybeSelectableItemProps.onClick = e => {
          this.trySetState({ selectedIndex: idx })
          _.invoke(this.props, 'onSelectedIndexChange', e, {
            ...this.props,
            ...{ selectedIndex: idx },
          })
        }
        maybeSelectableItemProps.selected = idx === selectedIndex
        maybeSelectableItemProps.tabIndex = idx === focusedIndex ? 0 : -1
      }

      const itemProps = {
        ..._.pick(this.props, List.itemProps),
        ...maybeSelectableItemProps,
      }

      return ListItem.create(item, {
        defaultProps: itemProps,
      })
    })
  }
}

export default List
