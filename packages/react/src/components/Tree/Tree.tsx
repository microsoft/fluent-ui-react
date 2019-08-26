import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Ref } from '@stardust-ui/react-component-ref'

import TreeItem, { TreeItemProps } from './TreeItem'
import {
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  UIComponent,
} from '../../lib'
import {
  ShorthandRenderFunction,
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ShorthandValue,
} from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { treeBehavior } from '../../lib/accessibility'
import { getNextElement } from '../../lib/accessibility/FocusZone/focusUtilities'

export interface TreeSlotClassNames {
  item: string
}

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Map with the subtrees and information related to their open/closed state. */
  activeItems?: Map<string, TreeActiveItemProps>

  /** Initial activeIndex value. */
  defaultActiveItems?: Map<string, TreeActiveItemProps>

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
}

export interface TreeItemForRenderProps {
  level: number
  id: string
  index: number
  item: ShorthandValue<TreeItemProps>
  items: TreeItemForRenderProps[]
  parentId: string
  siblingsLength: number
}

/*
 * Needed to keep track of sub-trees open state and also for a11y keyboard navigation,
 * such as expanding siblings on '*' or focusing parent on Arrow Left.
 */
export interface TreeActiveItemProps {
  element?: HTMLElement
  parentId?: string
  open?: boolean
  siblingSubtreeIds?: string[]
}

export interface TreeState {
  activeItems: Map<string, TreeActiveItemProps>
}

class Tree extends UIComponent<WithAsProp<TreeProps>, TreeState> {
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
    activeItems: PropTypes.any,
    defaultActiveItems: PropTypes.any,
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    accessibility: treeBehavior,
  }

  itemRefs = []
  treeRef = React.createRef<HTMLElement>()
  // In state we need only the items that can expand and spawn sub-trees.
  state: TreeState = { activeItems: new Map() }

  /**
   * For each item it adds information needed for accessibility (screen readers and kb navigation).
   * Returned values are used for rendering, while the items prop will remain unchanged.
   */
  getItemsForRender = _.memoize((itemsFromProps: ShorthandCollection<TreeItemProps>) => {
    let generatedId = 0
    const { activeItems } = this.state
    const { exclusive } = this.props

    const itemsForRenderGenerator = (items = itemsFromProps, level = 1, parentId?: string) => {
      const siblingSubtreeIds = []
      let subtreeAlreadyOpen = false

      return _.reduce(
        items,
        (acc: TreeItemForRenderProps[], item: ShorthandValue<TreeItemProps>, index: number) => {
          const isSubtree = !!item['items'] && item['items'].length > 0
          const id = item['id'] || `treeItemId${generatedId++}`

          // activeItems will contain only the items that can spawn sub-trees.
          if (isSubtree) {
            const subtreeOpen = !!item['initialOpen']
            if (subtreeOpen && exclusive) {
              // if exclusive, will open only first subtree.
              subtreeAlreadyOpen = true
            }
            activeItems.set(id, { open: subtreeOpen && !subtreeAlreadyOpen, siblingSubtreeIds })
            siblingSubtreeIds.push(id)
          }

          acc.push({
            // initial item.
            item,
            // added props needed for a11y.
            level,
            index,
            siblingsLength: items.length,
            parentId,
            id,
            // children items will go through the same process.
            ...(isSubtree && { items: itemsForRenderGenerator(item['items'], level + 1, id) }),
          })
          return acc
        },
        [],
      )
    }

    const itemsForRender = itemsForRenderGenerator()

    /* Remove each item's id from its array of siblingSubtreeIds. */
    for (const key of Array.from(activeItems.keys())) {
      this.setActiveItem(key, ({ siblingSubtreeIds }) => ({
        siblingSubtreeIds: siblingSubtreeIds.filter(id => id !== key),
      }))
    }

    this.setState({ activeItems })

    return itemsForRender
  })

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (
      e: React.SyntheticEvent,
      treeItemProps: TreeItemProps,
      predefinedProps: TreeItemProps,
    ) => {
      const { activeItems } = this.state
      const { id, items } = treeItemProps

      if (items && items.length > 0) {
        this.closeSiblingWhenExlusive(id)
        this.setActiveItem(id, ({ open }) => ({ open: !open }))

        this.setState({
          activeItems,
        })
      }

      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
    onFocusParent: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { parentId } = treeItemProps

      if (!parentId) {
        return
      }

      const { activeItems } = this.state
      const elementToBeFocused = activeItems.get(parentId).element

      if (!elementToBeFocused) {
        return
      }

      elementToBeFocused.focus()
      _.invoke(predefinedProps, 'onFocusParent', e, treeItemProps)
    },
    onFocusFirstChild: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { id } = treeItemProps

      const { activeItems } = this.state
      const currentElement = activeItems.get(id).element

      if (!currentElement) {
        return
      }

      const elementToBeFocused = getNextElement(this.treeRef.current, currentElement)

      if (!elementToBeFocused) {
        return
      }

      elementToBeFocused.focus()
      _.invoke(predefinedProps, 'onFocusFirstChild', e, treeItemProps)
    },
    onSiblingsExpand: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      if (this.props.exclusive) {
        return
      }

      const { id } = treeItemProps
      const { activeItems } = this.state
      const { siblingSubtreeIds } = activeItems.get(id)

      siblingSubtreeIds.forEach(siblingSubtreeId => {
        this.setActiveItem(siblingSubtreeId, { open: true })
      })

      this.setState({
        activeItems,
      })

      _.invoke(predefinedProps, 'onSiblingsExpand', e, treeItemProps)
    },
  })

  renderContent() {
    const { activeItems } = this.state
    const { items, renderItemTitle } = this.props

    if (!items) return null

    const renderItems = (itemsForRender: TreeItemForRenderProps[]) => {
      return itemsForRender.reduce(
        (renderedItems: any[], itemForRender: TreeItemForRenderProps, index: number) => {
          const { item, items, parentId, id, ...rest } = itemForRender
          const isFirstChild = index === 0 && !!parentId
          const isSubtree = !!items && items.length > 0
          const isSubtreeOpen = isSubtree && activeItems.get(id).open

          const renderedItem = TreeItem.create(item, {
            defaultProps: {
              className: Tree.slotClassNames.item,
              open: isSubtreeOpen,
              id,
              parentId,
              renderItemTitle,
              ...rest,
            },
            overrideProps: this.handleTreeItemOverrides,
          })

          // Only need refs of the items that spawn subtrees, when they need to be focused
          // by any of their children, using Arrow Left.
          const finalRenderedItem =
            isSubtree || isFirstChild ? (
              <Ref
                key={item['key'] || id}
                innerRef={(itemElement: HTMLElement) => {
                  this.setActiveItem(id, { element: itemElement })
                }}
              >
                {renderedItem}
              </Ref>
            ) : (
              renderedItem
            )

          return [
            ...(renderedItems as any[]),
            finalRenderedItem,
            ...[isSubtreeOpen ? renderItems(items) : []],
          ]
        },
        [],
      )
    }

    return renderItems(this.getItemsForRender(items))
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children } = this.props
    this.itemRefs = []

    return (
      <Ref innerRef={this.treeRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...rtlTextContainer.getAttributes({ forElements: [children] })}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {childrenExist(children) ? children : this.renderContent()}
        </ElementType>
      </Ref>
    )
  }

  /**
   * Similar to how setState works, merges changes on top of old value of an activeItem.
   *
   * @param id Id of the activeItem.
   * @param changes Changes to be merged on top of old value or a callback that takes old
   * value as param and returns a new value.
   */
  setActiveItem(
    id: string,
    changes: ((oldValue: TreeActiveItemProps) => TreeActiveItemProps) | TreeActiveItemProps,
  ) {
    const { activeItems } = this.state
    const activeItemValue = activeItems.get(id)
    activeItems.set(id, {
      ...activeItemValue,
      ...(_.isFunction(changes) ? changes(activeItemValue) : changes),
    })
  }

  /**
   * In the case of exclusive tree, we will close the other open sibling at opening
   * a tree item.
   *
   * @param id The id of the tree item to be opened.
   */
  closeSiblingWhenExlusive(id: string) {
    const { exclusive } = this.props

    if (!exclusive) {
      return
    }

    const { activeItems } = this.state
    const activeItemValue = activeItems.get(id)

    if (activeItemValue.siblingSubtreeIds.length === 0) {
      return
    }

    const alreadyOpenSiblingId = activeItemValue.siblingSubtreeIds.find(siblingSubtreeId => {
      return activeItems.get(siblingSubtreeId).open
    })

    if (alreadyOpenSiblingId) {
      this.setActiveItem(alreadyOpenSiblingId, { open: false })
    }
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
