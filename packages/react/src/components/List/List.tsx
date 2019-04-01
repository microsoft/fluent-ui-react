import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import {
  childrenExist,
  AutoControlledComponent,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import ListItem, { ListItemProps } from './ListItem'
import { listBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ContainerFocusHandler } from '../../lib/accessibility/FocusHandling/FocusContainer'
import { ReactProps, ShorthandValue, ComponentEventHandler } from '../../types'

export interface ListSlotClassNames {
  item: string
}

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

  static slotClassNames: ListSlotClassNames = {
    item: `${List.className}__item`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
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

  handleItemOverrides = (predefinedProps: ListItemProps) => {
    const { selectable } = this.props

    return {
      onFocus: (e: React.SyntheticEvent, itemProps: ListItemProps) => {
        _.invoke(predefinedProps, 'onFocus', e, itemProps)

        if (selectable) {
          this.setState({ focusedIndex: itemProps.index })
        }
      },
      onClick: (e: React.SyntheticEvent, itemProps: ListItemProps) => {
        _.invoke(predefinedProps, 'onClick', e, itemProps)

        if (selectable) {
          this.trySetState({ selectedIndex: itemProps.index })
          _.invoke(this.props, 'onSelectedIndexChange', e, {
            ...this.props,
            ...{ selectedIndex: itemProps.index },
          })
        }
      },
    }
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  renderItems() {
    const { items, selectable } = this.props
    const { focusedIndex, selectedIndex } = this.state

    this.focusHandler.syncFocusedIndex(focusedIndex)

    this.itemRefs = []

    return _.map(items, (item, index) => {
      const maybeSelectableItemProps = {} as any

      if (selectable) {
        const ref = React.createRef()
        this.itemRefs[index] = ref

        maybeSelectableItemProps.ref = ref
        maybeSelectableItemProps.selected = index === selectedIndex
        maybeSelectableItemProps.tabIndex = index === focusedIndex ? 0 : -1
      }

      const itemProps = {
        className: List.slotClassNames.item,
        ..._.pick(this.props, List.itemProps),
        ...maybeSelectableItemProps,
        index,
      }

      return ListItem.create(item, {
        defaultProps: itemProps,
        overrideProps: this.handleItemOverrides,
      })
    })
  }
}

export default List
