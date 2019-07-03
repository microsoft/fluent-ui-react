import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { VariableSizeList as List } from 'react-window'

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
import { ShorthandValue, ShorthandRenderFunction, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { treeBehavior } from '../../lib/accessibility'

export interface TreeSlotClassNames {
  item: string
}

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active subtree. */
  activeIndex?: number[] | number

  /**
   * Accessibility behavior if overridden by the user.
   * @default treeBehavior
   */
  accessibility?: Accessibility

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[] | number

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** Shorthand array of props for Tree. */
  items: ShorthandValue[]

  size?: number
  onSizeUpdate?: Function

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
  activeIndex: number[] | number
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
    activeIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    defaultActiveIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
    size: PropTypes.number,
    onSizeUpdate: PropTypes.bool,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: treeBehavior,
  }

  static autoControlledProps = ['activeIndex']

  constructor(props: TreeProps, context) {
    super(props, context)

    this.itemSizes = props.items.map(item => item['height'] || 20)
  }

  itemSizes

  actionHandlers = {
    expandSiblings: e => {
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
      this.trySetState({ activeIndex })
    },
  }

  getInitialAutoControlledState({ exclusive }): TreeState {
    return {
      activeIndex: exclusive ? -1 : [],
    }
  }

  getActiveIndexes(): number[] {
    const { activeIndex } = this.state
    return _.isArray(activeIndex) ? activeIndex : [activeIndex]
  }

  computeNewIndex = (treeItemProps: TreeItemProps) => {
    const { index, items } = treeItemProps
    const activeIndexes = this.getActiveIndexes()
    const { exclusive, onSizeUpdate } = this.props
    if (!items) {
      return activeIndexes
    }

    if (exclusive) {
      onSizeUpdate()
      return index
    }

    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndexes, index)
      ? _.without(activeIndexes, index)
      : [...activeIndexes, index]
  }

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      this.trySetState({ activeIndex: this.computeNewIndex(treeItemProps) })
      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
  })

  renderContent() {
    const { items, size } = this.props

    return (
      <List height={size} itemCount={items.length} itemSize={index => this.itemSizes[index]}>
        {this.renderItem}
      </List>
    )
  }

  renderItem = ({ index, style }) => {
    const { items, renderItemTitle, exclusive, size } = this.props
    const { activeIndex } = this.state
    const activeIndexes = this.getActiveIndexes()

    return TreeItem.create(items[index], {
      defaultProps: {
        className: Tree.slotClassNames.item,
        index,
        exclusive,
        renderItemTitle,
        open: exclusive ? index === activeIndex : _.includes(activeIndexes, index),
        style,
        onSizeUpdate: (update: number) => {
          this.itemSizes[index] += update
        },
        containerSize: size,
      },
      overrideProps: this.handleTreeItemOverrides,
    })
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

Tree.create = createShorthandFactory({ Component: Tree, mappedArrayProp: 'items' })

/**
 * Allows users to display data organised in tree-hierarchy.
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof Tree, TreeProps, 'ul'>(Tree)
