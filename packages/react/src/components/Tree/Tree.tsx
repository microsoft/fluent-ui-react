import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeItem, { TreeItemProps } from './TreeItem'
import {
  AutoControlledComponent,
  childrenExist,
  commonPropTypes,
  customPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../lib'
import { ShorthandValue, ShorthandRenderFunction, ReactProps } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'

export interface TreeProps extends UIComponentProps, ChildrenComponentProps {
  /** Index of the currently active subtree. */
  activeIndex?: number[] | number

  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

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

/**
 * Allows users to display data organised in tree-hierarchy.
 */
class Tree extends AutoControlledComponent<ReactProps<TreeProps>, any> {
  static create: Function

  static className = 'ui-tree'

  static displayName = 'Tree'

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
  }

  public static defaultProps = {
    as: 'ul',
    accessibility: defaultBehavior,
  }

  static autoControlledProps = ['activeIndex']

  getInitialAutoControlledState({ defaultActiveIndex, exclusive }) {
    return {
      activeIndex: defaultActiveIndex === undefined ? (exclusive ? -1 : []) : defaultActiveIndex,
    }
  }

  computeNewIndex = index => {
    const { activeIndex } = this.state
    const { exclusive } = this.props

    if (exclusive) return index === activeIndex ? -1 : index
    // check to see if index is in array, and remove it, if not then add it
    return _.includes(activeIndex, index) ? _.without(activeIndex, index) : [...activeIndex, index]
  }

  handleTreeItemOverrides = predefinedProps => ({
    onOpenChange: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { index } = treeItemProps
      this.trySetState({
        activeIndex: this.computeNewIndex(index),
      })
      _.invoke(predefinedProps, 'onOpenChange', e, treeItemProps)
    },
  })

  renderContent() {
    const { items, renderItemTitle, exclusive } = this.props

    return _.map(items, (item, index) =>
      TreeItem.create(item, {
        defaultProps: {
          index,
          exclusive,
          renderItemTitle,
          open: exclusive
            ? index === this.state.activeIndex
            : _.includes(this.state.activeIndex, index),
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
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

export default Tree
