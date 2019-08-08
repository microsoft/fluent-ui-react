import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { handleRef, Ref } from '@stardust-ui/react-component-ref'

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
import { getFirstFocusable } from '../../lib/accessibility/FocusZone/focusUtilities'

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

  itemRefs = []

  getInitialAutoControlledState(): TreeState {
    if (this.props.items) {
      const setItemsLevelAndSize = (items = this.props.items, level = 1, parent?) => {
        items.forEach((item: ShorthandValue<TreeItemProps>, index: number) => {
          item['level'] = level
          item['siblings'] = items
          item['indexInSubtree'] = index
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
    onTitleClick: (
      e: React.SyntheticEvent,
      treeItemProps: TreeItemProps,
      predefinedProps: TreeItemProps,
    ) => {
      const { indexInTree, open, siblings, indexInSubtree } = treeItemProps
      const { activeItems } = this.state
      if (open) {
        const nextSibling = siblings[indexInSubtree + 1]
        if (!nextSibling) {
          this.setState({
            activeItems: activeItems.slice(0, indexInTree + 1),
          })
        } else {
          const nextSiblingIndexInTree = activeItems.indexOf(nextSibling)
          this.setState({
            activeItems: [
              ...activeItems.slice(0, indexInTree + 1),
              ...activeItems.slice(nextSiblingIndexInTree),
            ],
          })
        }
      } else {
        const subItems = activeItems[indexInTree]['items']
        if (!subItems) {
          return
        }
        this.setState({
          activeItems: [
            ...activeItems.slice(0, indexInTree + 1),
            ...subItems,
            ...activeItems.slice(indexInTree + 1),
          ],
        })
      }
      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
    onParentFocus: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { indexInTree } = treeItemProps
      const { activeItems } = this.state
      const parentItem = activeItems[indexInTree]['parent']

      if (parentItem) {
        const parentItemIndex = activeItems.indexOf(parentItem)
        this.itemRefs[parentItemIndex].current.focus()
      }

      _.invoke(predefinedProps, 'onParentFocus', e, treeItemProps)
    },
    onFirstChildFocus: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { indexInTree } = treeItemProps
      const { activeItems } = this.state

      if (activeItems[indexInTree]['items']) {
        const element = getFirstFocusable(
          this.itemRefs[indexInTree + 1].current,
          this.itemRefs[indexInTree + 1].current,
          true,
        )
        if (element) {
          element.focus()
        }
      }

      _.invoke(predefinedProps, 'onFirstChildFocus', e, treeItemProps)
    },
  })

  renderContent() {
    const { activeItems } = this.state

    return _.map(activeItems, (item: ShorthandValue<TreeItemProps>, index: number) => {
      const isSubtree = !!item['items']
      const open = isSubtree && activeItems[index + 1] === item['items'][0]

      return (
        <Ref
          innerRef={(itemElement: HTMLElement) => {
            if (
              !itemElement ||
              (this.itemRefs.length &&
                this.itemRefs[this.itemRefs.length - 1].current === itemElement)
            ) {
              return
            }

            const ref = React.createRef()
            this.itemRefs.push(ref)
            handleRef(ref, itemElement)
          }}
        >
          {TreeItem.create(item, {
            defaultProps: {
              className: Tree.slotClassNames.item,
              open,
              indexInTree: index,
            },
            overrideProps: this.handleTreeItemOverrides,
          })}
        </Ref>
      )
    })
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children } = this.props
    this.itemRefs = []

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
