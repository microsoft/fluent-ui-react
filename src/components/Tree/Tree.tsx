import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeItem from './TreeItem'
import { UIComponent, childrenExist } from '../../lib'
import { ShorthandValue, ShorthandRenderFunction } from '../../../types/utils'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import * as customPropTypes from '../../lib/customPropTypes'

export interface TreeProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** Shorthand array of props for Tree. */
  items: ShorthandValue[]

  /** Whether the tree is a subtree. */
  nested?: boolean

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
    renderItemTitle: PropTypes.func,
  }

  public static defaultProps = {
    as: 'ul',
    accessibility: defaultBehavior,
  }

  renderContent() {
    const { items, renderItemTitle } = this.props

    return _.map(items, item =>
      TreeItem.create(item, {
        defaultProps: {
          renderItemTitle,
        },
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, rest, styles, variables }) {
    const { children, nested } = this.props

    if (nested) {
      classes.root = `ui-subtree ${classes.root}`
    }

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

export default Tree
