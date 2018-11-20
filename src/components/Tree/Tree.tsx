import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeListItem from './TreeListItem'
import { UIComponent, childrenExist, createShorthandFactory } from '../../lib'
import { ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import { treeBehavior } from '../../lib/accessibility'
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

class Tree extends UIComponent<TreeProps> {
  static create: Function

  static className = 'ui-tree'

  static displayName = 'Tree'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    accessibility: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    nested: PropTypes.boolean,
    renderTitle: PropTypes.func,
  }

  public static defaultProps = {
    as: 'ul',
    accessibility: treeBehavior as Accessibility,
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
      <ElementType {...rest} className={classes.root} {...accessibility.attributes.root}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

Tree.create = createShorthandFactory(Tree, 'content')

export default Tree
