import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeListItem from './TreeListItem'
import { UIComponent, childrenExist, createShorthandFactory } from '../../lib'
import { ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import { Accessibility } from '../../lib/accessibility/types'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import * as customPropTypes from '../../lib/customPropTypes'

export interface TreeProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default treeBehavior
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Tree. */
  items: ShorthandValue[]

  /** Whether the tree is a subtree. */
  nested?: boolean

  /**
   * A custom render function the title slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderTitle?: ShorthandRenderFunction
}

/**
 * A tree allows users to display nested trees.
 */
class Tree extends UIComponent<TreeProps> {
  static create: Function

  static className = 'ui-tree'

  static displayName = 'Tree'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    accessibility: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    nested: PropTypes.bool,
    renderTitle: PropTypes.func,
  }

  public static defaultProps = {
    as: 'ul',
  }

  renderContent() {
    const { items, renderTitle } = this.props

    return _.map(items, item =>
      TreeListItem.create(item, {
        defaultProps: {
          renderTitle,
        },
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, rest, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

Tree.create = createShorthandFactory(Tree, 'content')

export default Tree
