import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { handleRef, Ref } from '@stardust-ui/react-component-ref'

import TreeItem, { TreeItemProps } from './TreeItem'
import {
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  AutoControlledComponent,
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
  activeItemIds?: string[]

  /** Initial activeIndex value. */
  defaultActiveItemIds?: string[]

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
  elementRef: React.RefObject<HTMLElement>
  id: string
  index: number
  level: number
  parent: ShorthandValue<TreeItemProps>
  siblings: ShorthandCollection<TreeItemProps>
}

export interface TreeState {
  activeItemIds: string[]
  itemsForRender: { [s: string]: TreeItemForRenderProps }
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
    activeItemIds: customPropTypes.collectionShorthand,
    defaultActiveItemIds: customPropTypes.collectionShorthand,
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    accessibility: treeBehavior,
  }

  static autoControlledProps = ['activeItemIds']

  static isSubtree(item: TreeItemProps | ShorthandValue<TreeItemProps>): boolean {
    return !!item['items'] && item['items'].length > 0
  }

  static getItemsForRender = _.memoize((itemsFromProps: ShorthandCollection<TreeItemProps>) => {
    const itemsForRenderGenerator = (
      items = itemsFromProps,
      level = 1,
      parent?: ShorthandValue<TreeItemProps>,
    ) => {
      return _.reduce(
        items,
        (acc: Object, item: ShorthandValue<TreeItemProps>, index: number) => {
          const id = item['id']
          const isSubtree = Tree.isSubtree(item)

          acc[id] = {
            elementRef: React.createRef<HTMLElement>(),
            level,
            index,
            parent,
            siblings: items.filter(currentItem => currentItem !== item),
          }

          return {
            ...acc,
            ...(isSubtree ? itemsForRenderGenerator(item['items'], level + 1, item) : {}),
          }
        },
        {},
      )
    }

    return itemsForRenderGenerator(itemsFromProps)
  })

  static getAutoControlledStateFromProps(nextProps: TreeProps, prevState: TreeState) {
    const itemsForRender = Tree.getItemsForRender(nextProps.items)

    return {
      itemsForRender,
    }
  }

  getInitialAutoControlledState() {
    return { activeItemIds: [] }
  }

  treeRef = React.createRef<HTMLElement>()

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (
      e: React.SyntheticEvent,
      treeItemProps: TreeItemProps,
      predefinedProps: TreeItemProps,
    ) => {
      const { activeItemIds } = this.state
      const { id, siblings } = treeItemProps
      const { exclusive } = this.props

      if (!Tree.isSubtree(treeItemProps)) {
        return
      }

      const indexOfActiveItem = activeItemIds.indexOf(id)

      if (indexOfActiveItem > -1) {
        activeItemIds.splice(indexOfActiveItem, 1)
      } else {
        if (exclusive) {
          siblings.some(sibling => {
            const activeSiblingIndex = activeItemIds.indexOf(sibling['id'])
            if (activeSiblingIndex > -1) {
              activeItemIds.splice(activeSiblingIndex, 1)
              return true
            }
            return false
          })
        }

        activeItemIds.push(id)
      }

      this.setState({
        activeItemIds,
      })

      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
    onFocusParent: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { parent } = treeItemProps

      if (!parent) {
        return
      }

      const { itemsForRender } = this.state
      const elementToBeFocused = itemsForRender[parent['id']].elementRef

      if (!elementToBeFocused) {
        return
      }

      elementToBeFocused.current.focus()
      _.invoke(predefinedProps, 'onFocusParent', e, treeItemProps)
    },
    onFocusFirstChild: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { id } = treeItemProps

      const { itemsForRender } = this.state
      const currentElement = itemsForRender[id].elementRef

      if (!currentElement && currentElement.current) {
        return
      }

      const elementToBeFocused = getNextElement(this.treeRef.current, currentElement.current)

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

      const { id, siblings } = treeItemProps
      const { activeItemIds } = this.state

      siblings.forEach(sibling => {
        if (Tree.isSubtree(sibling) && activeItemIds.indexOf(sibling['id']) < 0) {
          activeItemIds.push(sibling['id'])
        }
      })

      if (Tree.isSubtree(treeItemProps) && activeItemIds.indexOf(id) < 0) {
        activeItemIds.push(id)
      }

      this.setState({
        activeItemIds,
      })

      _.invoke(predefinedProps, 'onSiblingsExpand', e, treeItemProps)
    },
  })

  renderContent() {
    const { activeItemIds, itemsForRender } = this.state
    const { items, renderItemTitle } = this.props

    if (!items) return null

    const renderItems = (items: ShorthandCollection<TreeItemProps>): any[] => {
      return items.reduce((renderedItems: any[], item: ShorthandValue<TreeItemProps>) => {
        const itemForRender = itemsForRender[item['id']]
        const { elementRef, ...rest } = itemForRender
        const isSubtree = Tree.isSubtree(item)
        const isSubtreeOpen = isSubtree && activeItemIds.indexOf(item['id']) > -1

        const renderedItem = TreeItem.create(item, {
          defaultProps: {
            className: Tree.slotClassNames.item,
            open: isSubtreeOpen,
            renderItemTitle,
            key: item['id'],
            ...rest,
          },
          overrideProps: this.handleTreeItemOverrides,
        })

        // Only need refs of the items that spawn subtrees, when they need to be focused
        // by any of their children, using Arrow Left.
        const finalRenderedItem = isSubtree ? (
          <Ref
            key={item['key'] || item['id']}
            innerRef={(itemElement: HTMLElement) => {
              handleRef(elementRef, itemElement)
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
      }, [])
    }

    return renderItems(items)
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children } = this.props

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
