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

export interface TreeActiveItemProps {
  element?: HTMLElement
  parentId?: string
  open: boolean
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
  state: TreeState = { activeItems: new Map() }

  getItemsForRender = _.memoize((itemsFromProps: ShorthandCollection<TreeItemProps>) => {
    let generatedId = 0
    const { activeItems } = this.state
    const itemsForRenderGenerator = (items = itemsFromProps, level = 1, parentId?: string) => {
      const siblingSubtreeIds = []
      return _.reduce(
        items,
        (acc: TreeItemForRenderProps[], item: ShorthandValue<TreeItemProps>, index: number) => {
          const isSubtree = !!item['items']
          const id = item['id'] || `treeItemId${generatedId++}`

          if (isSubtree) {
            activeItems.set(id, { open: !!item['defaultOpen'], siblingSubtreeIds })
            siblingSubtreeIds.push(id)
          }

          acc.push({
            item,
            level,
            index,
            siblingsLength: items.length,
            parentId,
            id,
            ...(isSubtree && { items: itemsForRenderGenerator(item['items'], level + 1, id) }),
          })
          return acc
        },
        [],
      )
    }

    this.setState({ activeItems })

    return itemsForRenderGenerator()
  })

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (
      e: React.SyntheticEvent,
      treeItemProps: TreeItemProps,
      predefinedProps: TreeItemProps,
    ) => {
      const { activeItems } = this.state
      const { id } = treeItemProps
      const activeItemValue = activeItems.get(id)

      if (treeItemProps.items) {
        activeItems.set(id, { ...activeItemValue, open: !activeItemValue.open })
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

      activeItems.get(parentId).element.focus()

      _.invoke(predefinedProps, 'onFocusParent', e, treeItemProps)
    },
    onFocusFirstChild: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { id } = treeItemProps

      const { activeItems } = this.state
      const currentElement = activeItems.get(id).element

      const element = getNextElement(this.treeRef.current, currentElement)
      if (element) {
        element.focus()
      }

      _.invoke(predefinedProps, 'onFocusFirstChild', e, treeItemProps)
    },
    onSiblingsExpand: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { id } = treeItemProps
      const { activeItems } = this.state
      const { siblingSubtreeIds } = activeItems.get(id)

      siblingSubtreeIds.forEach(siblingSubtreeId => {
        const siblingSubtreeData = activeItems.get(siblingSubtreeId)
        activeItems.set(siblingSubtreeId, { ...siblingSubtreeData, open: true })
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
          const isSubtree = !!items
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

          const finalRenderedItem =
            isSubtree || isFirstChild ? (
              <Ref
                key={item['key'] || id}
                innerRef={(itemElement: HTMLElement) => {
                  const activeItemValue = activeItems.get(id)
                  activeItems.set(id, { ...activeItemValue, element: itemElement })
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
