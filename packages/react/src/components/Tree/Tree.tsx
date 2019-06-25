import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Ref } from '@stardust-ui/react-component-ref'

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

  computeNewOpenItemsCount?: Function

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[] | number

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** Shorthand array of props for Tree. */
  items: ShorthandValue[]

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
  containerHeight?: number
  itemHeight?: number
  itemsCount?: number
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
    computeNewOpenItemsCount: PropTypes.func,
    defaultActiveIndex: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    ]),
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: treeBehavior,
  }

  static autoControlledProps = ['activeIndex']

  contentRef = React.createRef<HTMLElement>()
  firstItemRef = React.createRef<HTMLElement>()

  actionHandlers = {
    expandSiblings: e => {
      const {
        items,
        exclusive,
        computeNewOpenItemsCount = this.computeNewOpenItemsCount,
      } = this.props
      const { activeIndex } = this.state

      e.preventDefault()
      e.stopPropagation()

      if (exclusive || _.isEmpty(items)) {
        return
      }

      let subItemsOpened = 0
      const newActiveIndex = items.reduce<number[]>((acc, item, index) => {
        if (!_.isEmpty(item['items'])) {
          if (!_.includes(activeIndex as number[], index)) {
            subItemsOpened += item['items'].length
          }
          return [...acc, index]
        }
        return acc
      }, [])

      this.trySetState({ activeIndex: newActiveIndex })
      computeNewOpenItemsCount(subItemsOpened)
    },
  }

  getInitialAutoControlledState({ exclusive }): TreeState {
    return {
      activeIndex: exclusive ? -1 : [],
      itemsCount: this.props.items.length,
    }
  }

  componentDidMount() {
    const {
      exclusive,
      computeNewOpenItemsCount = this.computeNewOpenItemsCount,
      items,
    } = this.props
    const { activeIndex } = this.state

    this.setState({
      containerHeight: this.contentRef.current.clientHeight,
      itemHeight: this.firstItemRef.current.offsetHeight,
    })

    if (exclusive) {
      if (activeIndex === -1) {
        return
      }

      const childrenItemsCount = items[activeIndex as number]['items'].length
      computeNewOpenItemsCount(childrenItemsCount)
    } else {
      if (activeIndex === [-1]) {
        return
      }

      const childrenItemsCount = (activeIndex as number[]).reduce<number>((acc, index) => {
        const childrenItemsAtIndex = items[index]['items']
        if (!_.isEmpty(childrenItemsAtIndex)) {
          return acc + childrenItemsAtIndex.length
        }
        return acc
      }, 0)
      computeNewOpenItemsCount(childrenItemsCount)
    }
  }

  getActiveIndexes(): number[] {
    const { activeIndex } = this.state
    return _.isArray(activeIndex) ? activeIndex : [activeIndex]
  }

  computeNewIndex = (treeItemProps: TreeItemProps) => {
    const { index, items } = treeItemProps
    const activeIndexes = this.getActiveIndexes()
    const { exclusive, computeNewOpenItemsCount = this.computeNewOpenItemsCount } = this.props

    if (!items) {
      return activeIndexes
    }

    if (exclusive) {
      const previousItemsCount =
        this.state.activeIndex === -1
          ? 0
          : this.props.items[this.state.activeIndex as number]['items'].length
      computeNewOpenItemsCount(items.length - previousItemsCount)
      return index
    }

    const isIndexIncluded = _.includes(activeIndexes, index)
    computeNewOpenItemsCount(items.length * (isIndexIncluded ? -1 : 1))

    // check to see if index is in array, and remove it, if not then add it
    return isIndexIncluded ? _.without(activeIndexes, index) : [...activeIndexes, index]
  }

  computeNewOpenItemsCount = (itemsCount: number): void => {
    if (itemsCount === 0) {
      return
    }
    this.setState(state => ({ itemsCount: state.itemsCount + itemsCount }))
  }

  handleTreeItemOverrides = (predefinedProps: TreeItemProps) => ({
    onTitleClick: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      this.trySetState({ activeIndex: this.computeNewIndex(treeItemProps) })
      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
  })

  renderContent() {
    const { items, renderItemTitle, exclusive } = this.props
    const { activeIndex } = this.state
    const activeIndexes = this.getActiveIndexes()

    return _.map(items, (item: ShorthandValue, index: number) => {
      const treeItem = TreeItem.create(item, {
        defaultProps: {
          className: Tree.slotClassNames.item,
          index,
          exclusive,
          renderItemTitle,
          open: exclusive ? index === activeIndex : _.includes(activeIndexes, index),
          computeNewOpenItemsCount: this.computeNewOpenItemsCount,
        },
        overrideProps: this.handleTreeItemOverrides,
      })
      return index === 0 ? <Ref innerRef={this.firstItemRef}>{treeItem}</Ref> : treeItem
    })
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children } = this.props

    return (
      <Ref innerRef={this.contentRef}>
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

Tree.create = createShorthandFactory({ Component: Tree, mappedArrayProp: 'items' })

/**
 * Allows users to display data organised in tree-hierarchy.
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof Tree, TreeProps, 'ul'>(Tree)
