import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, createShorthandFactory } from '../../lib'
import { treeTitleBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib/commonPropInterfaces'

export interface TreeTitleProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default treeTitleBehavior
   */
  accessibility?: Accessibility

  /** Whether or not the subtree of the item is in the open state. */
  active?: boolean

  /** Whether or not the item has a subtree. */
  hasSubtree?: boolean
}

class TreeTitle extends UIComponent<TreeTitleProps, any> {
  static create: Function

  static className = 'ui-tree__title'

  static displayName = 'TreeTitle'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
    accessibility: PropTypes.func,
    active: PropTypes.bool,
    hasSubtree: PropTypes.bool,
  }

  public static defaultProps = {
    as: 'a',
    accessibility: treeTitleBehavior as Accessibility,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, rest, styles, variables }) {
    const { children, content } = this.props

    return (
      <ElementType
        {...rest}
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

TreeTitle.create = createShorthandFactory(TreeTitle, 'content')

export default TreeTitle
