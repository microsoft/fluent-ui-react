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
import { getFirstFocusable } from '../../lib/accessibility/FocusZone/focusUtilities'

export interface TreeSlotClassNames {
  item: string
}

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Initial activeIndex value. */
  defaultActiveItemsList?: ShorthandCollection<TreeItemProps>

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

export interface TreeState {
  activeItems: Map<ShorthandValue<TreeItemProps>, { open: boolean; element: HTMLElement }>
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
    activeItemsList: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    defaultActiveItemsList: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
    onactiveItemsListChange: PropTypes.func,
  }

  static defaultProps = {
    as: 'div',
    accessibility: treeBehavior,
  }

  static autoControlledProps = ['activeItemsList']

  itemRefs = []

  constructor(props, context) {
    super(props, context)

    const activeItems = new Map()
    if (this.props.items) {
      const setItemsLevelAndSize = (items = this.props.items, level = 1, parent?) => {
        items.forEach((item: ShorthandValue<TreeItemProps>, index: number) => {
          item['level'] = level
          item['siblings'] = items
          item['index'] = index
          if (parent) {
            item['parent'] = parent
          }
          if (!item['id']) {
            item['id'] = `${parent ? parent['id'] : ''}${index}`
          }
          if (item['items']) {
            setItemsLevelAndSize(item['items'], level + 1, item)
            activeItems.set(item['id'], { open: false })
          }
        })
      }
      setItemsLevelAndSize()
    }

    this.state = { activeItems }
  }

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (
      e: React.SyntheticEvent,
      treeItemProps: TreeItemProps,
      predefinedProps: TreeItemProps,
    ) => {
      const { activeItems } = this.state
      const itemId = treeItemProps['id']
      const activeItemValue = activeItems.get(itemId)

      activeItems.set(itemId, { ...activeItemValue, open: !activeItemValue.open })
      this.setState({
        activeItems,
      })

      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
    onFocusParent: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { parent } = treeItemProps

      if (!parent) {
        return
      }

      const { activeItems } = this.state

      activeItems.get(parent['id']).element.focus()

      _.invoke(predefinedProps, 'onFocusParent', e, treeItemProps)
    },
    onFocusFirstChild: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { items } = treeItemProps

      if (!items) {
        return
      }

      const { activeItems } = this.state
      const firstChildElement = activeItems.get(items[0]['id']).element

      const element = getFirstFocusable(firstChildElement, firstChildElement, true)
      if (element) {
        element.focus()
      }

      _.invoke(predefinedProps, 'onFocusFirstChild', e, treeItemProps)
    },
    onSiblingsExpand: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { siblings } = treeItemProps
      const { activeItems } = this.state
      const itemId = treeItemProps['id']
      const activeItemValue = activeItems.get(itemId)

      siblings.forEach(sibling => {
        activeItems.set(sibling['id'], { ...activeItemValue, open: true })
      })

      this.setState({
        activeItems,
      })
      // todo onSiblignsExpand event
    },
  })

  renderItems(items = this.props.items) {
    const { activeItems } = this.state

    return items.reduce((renderedItems, item) => {
      const isSubtreeOpen = item['items'] && activeItems.get(item['id']).open
      const renderedItem = (
        <Ref
          key={item['key'] || item['id']}
          innerRef={(itemElement: HTMLElement) => {
            const activeItemValue = activeItems.get(item['id'])

            activeItems.set(item['id'], { ...activeItemValue, element: itemElement })
          }}
        >
          {TreeItem.create(item, {
            defaultProps: {
              className: Tree.slotClassNames.item,
              open: isSubtreeOpen,
            },
            overrideProps: this.handleTreeItemOverrides,
          })}
        </Ref>
      )

      return [
        ...(renderedItems as any[]),
        renderedItem,
        ...[isSubtreeOpen ? this.renderItems(item['items']) : []],
      ]
    }, [])
  }

  renderContent() {
    const { items } = this.props
    if (!items) return null

    return this.renderItems()
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
