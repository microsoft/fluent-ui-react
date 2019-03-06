import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeItem, { TreeItemProps } from './TreeItem'
import {
  UIComponent,
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
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

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
class Tree extends UIComponent<ReactProps<TreeProps>> {
  static create: Function

  static className = 'ui-tree'

  static displayName = 'Tree'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    exclusive: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    renderItemTitle: PropTypes.func,
    rtlAttributes: PropTypes.func,
  }

  state = {
    activeIndex: -1,
  }

  public static defaultProps = {
    as: 'ul',
    accessibility: defaultBehavior,
  }

  handleTreeItemOverrides = predefinedProps => ({
    onOpenChange: (e: React.SyntheticEvent, treeItemProps: TreeItemProps) => {
      const { index } = treeItemProps
      this.setState({
        activeIndex: index,
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
          open: exclusive ? index === this.state.activeIndex : false,
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
