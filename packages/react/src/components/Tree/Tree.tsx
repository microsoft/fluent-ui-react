import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { CellMeasurer, CellMeasurerCache, List as ReactVirtualizedList } from 'react-virtualized'

import TreeItem, { TreeItemProps } from './TreeItem'
import {
  AutoControlledComponent,
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import {
  ShorthandRenderFunction,
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ComponentEventHandler,
  ShorthandValue,
} from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { treeBehavior } from '../../lib/accessibility'

export interface TreeSlotClassNames {
  item: string
}

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active subtree. */
  activeItems?: ShorthandCollection<TreeItemProps>

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Initial activeIndex value. */
  defaultActiveItems?: ShorthandCollection<TreeItemProps>

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** Shorthand array of props for Tree. */
  items?: ShorthandCollection<TreeItemProps>

  /**
   * A custom render function for the title slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction

  /** Called when activeIndex changes.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onActiveIndexChange?: ComponentEventHandler<TreeProps>
}

export interface TreeState {
  activeItems: ShorthandCollection<TreeItemProps>
}

class Tree extends AutoControlledComponent<WithAsProp<TreeProps>, TreeState> {
  static create: Function

  static displayName = 'Tree'

  static className = 'ui-tree'

  static slotClassNames: TreeSlotClassNames = {
    item: `${Tree.className}__item`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    activeItems: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    defaultActiveItems: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
    onActiveItemsChange: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    accessibility: treeBehavior,
  }

  static autoControlledProps = ['activeItems']

  cache = new CellMeasurerCache({
    defaultHeight: 20,
    fixedWidth: true,
  })

  actionHandlers = {
    expandSiblings: e => {
      /* not working yet
      const { items, exclusive } = this.props
      e.preventDefault()
      e.stopPropagation()

      if (exclusive) {
        return
      }
      const activeIndex = items
        ? items.reduce<number[]>((acc, item, index) => {
            if (item['items']) {
              return [...acc, index]
            }
            return acc
          }, [])
        : []
      this.trySetActiveIndexAndTriggerEvent(e, activeIndex)
      */
    },
  }

  // trySetActiveIndexAndTriggerEvent = (e, activeIndex) => {
  //   this.trySetState({ activeItems: activeIndex })
  //   _.invoke(this.props, 'onActiveIndexChange', e, { ...this.props, activeIndex })
  // }

  getInitialAutoControlledState(): TreeState {
    if (this.props.items) {
      const setItemsLevelAndSize = (items = this.props.items, level = 1, parent?) => {
        items.forEach((item: ShorthandValue<TreeItemProps>, index: number) => {
          item['level'] = level
          item['siblings'] = items
          item['position'] = index + 1
          if (parent) {
            item['parent'] = parent
          }

          if (item['items']) {
            setItemsLevelAndSize(item['items'], level + 1, item)
          }
        })
      }
      setItemsLevelAndSize()
    }

    return {
      activeItems: this.props.items || [],
    }
  }

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { index, open, items } = treeItemProps
      const { activeItems } = this.state
      if (open) {
        const end = activeItems.indexOf(_.last(items))
        this.setState({
          activeItems: [...activeItems.slice(0, index + 1), ...activeItems.slice(end + 1)],
        })
      } else {
        const subItems = activeItems[index]['items']
        if (!subItems) {
          return
        }
        this.setState({
          activeItems: [
            ...activeItems.slice(0, index + 1),
            ...subItems,
            ...activeItems.slice(index + 1),
          ],
        })
      }
      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
  })

  rowRenderer = ({ index, key, parent, style }) => {
    const { activeItems } = this.state
    const isSubtree = !!activeItems[index]['items']
    const open = isSubtree && activeItems[index + 1] === activeItems[index]['items'][0]
    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {TreeItem.create(activeItems[index], {
          defaultProps: {
            className: Tree.slotClassNames.item,
            style,
            open,
            index,
          },
          overrideProps: this.handleTreeItemOverrides,
        })}
      </CellMeasurer>
    )
  }

  renderContent() {
    const { activeItems } = this.state

    return (
      <ReactVirtualizedList
        deferredMeasurementCache={this.cache}
        rowHeight={this.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        height={100}
        rowCount={activeItems.length}
        width={600}
      />
    )
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

Tree.create = createShorthandFactory({
  Component: Tree,
  mappedArrayProp: 'items',
})

/**
 * A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof Tree, TreeProps, 'ul'>(Tree)
