import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import HierarchicalTreeItem, { HierarchicalTreeItemProps } from './HierarchicalTreeItem'
import {
  AutoControlledComponent,
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../lib'
import {
  ShorthandValue,
  ShorthandRenderFunction,
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ComponentEventHandler,
} from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { hierarchicalTreeBehavior } from '../../lib/accessibility'

export interface HierarchicalTreeSlotClassNames {
  item: string
}

export interface HierarchicalTreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active subtree. */
  activeIndex?: number[] | number

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** Initial activeIndex value. */
  defaultActiveIndex?: number[] | number

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean

  /** Shorthand array of props for Tree. */
  items?: ShorthandCollection<HierarchicalTreeItemProps>

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
  onActiveIndexChange?: ComponentEventHandler<HierarchicalTreeProps>
}

export interface HierarchicalTreeState {
  activeIndex: number[] | number
}

class HierarchicalTree extends AutoControlledComponent<
  WithAsProp<HierarchicalTreeProps>,
  HierarchicalTreeState
> {
  static create: ShorthandFactory<HierarchicalTreeProps>

  static displayName = 'HierarchicalTree'

  static className = 'ui-hierarchicaltree'

  static slotClassNames: HierarchicalTreeSlotClassNames = {
    item: `${HierarchicalTree.className}__item`,
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
    onActiveIndexChange: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: hierarchicalTreeBehavior,
  }

  static autoControlledProps = ['activeIndex']

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
      this.trySetActiveIndexAndTriggerEvent(e, activeIndex)
    },
  }

  trySetActiveIndexAndTriggerEvent = (e, activeIndex) => {
    this.setState({ activeIndex })
    _.invoke(this.props, 'onActiveIndexChange', e, { ...this.props, activeIndex })
  }

  getInitialAutoControlledState({ exclusive }): HierarchicalTreeState {
    return {
      activeIndex: exclusive ? -1 : [],
    }
  }

  getActiveIndexes(): number[] {
    const { activeIndex } = this.state
    return _.isArray(activeIndex) ? activeIndex : [activeIndex]
  }

  computeNewIndex = (treeItemProps: HierarchicalTreeItemProps) => {
    const { index, items } = treeItemProps
    const activeIndexes = this.getActiveIndexes()
    const { exclusive } = this.props
    if (!items) {
      return activeIndexes
    }

    if (exclusive) return index

    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndexes, index)
      ? _.without(activeIndexes, index)
      : [...activeIndexes, index]
  }

  handleTreeItemOverrides = (predefinedProps: HierarchicalTreeItemProps) => ({
    onTitleClick: (e: React.SyntheticEvent, treeItemProps: HierarchicalTreeItemProps) => {
      this.trySetActiveIndexAndTriggerEvent(e, this.computeNewIndex(treeItemProps))
      _.invoke(predefinedProps, 'onTitleClick', e, treeItemProps)
    },
  })

  renderContent() {
    const { items, renderItemTitle, exclusive } = this.props
    const { activeIndex } = this.state
    const activeIndexes = this.getActiveIndexes()

    return _.map(items, (item: ShorthandValue<HierarchicalTreeItemProps>, index: number) =>
      HierarchicalTreeItem.create(item, {
        defaultProps: {
          className: HierarchicalTree.slotClassNames.item,
          index,
          exclusive,
          renderItemTitle,
          open: exclusive ? index === activeIndex : _.includes(activeIndexes, index),
        },
        overrideProps: this.handleTreeItemOverrides,
      }),
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

HierarchicalTree.create = createShorthandFactory({
  Component: HierarchicalTree,
  mappedArrayProp: 'items',
})

/**
 * (DEPRECATED) A Tree displays data organised in tree hierarchy.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export default withSafeTypeForAs<typeof HierarchicalTree, HierarchicalTreeProps, 'ul'>(
  HierarchicalTree,
)
