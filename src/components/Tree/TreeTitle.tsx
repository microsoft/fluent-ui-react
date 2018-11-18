import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import { treeTitleBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

export type TreeTitleProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  active?: boolean
  hasSubtree?: boolean
}

class TreeTitle extends UIComponent<TreeTitleProps, any> {
  static create: Function

  static className = 'tree-title'

  static displayName = 'TreeTitle'

  // static handledProps = ['as', 'children', 'content', 'styles', 'variables']

  static propTypes = {
    /** An element type to render as. */
    as: customPropTypes.as,

    /** Define your own children. */
    children: PropTypes.node,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Custom styles to be applied to the component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied to the component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Whether or not the subtree of the item is in the open state. */
    active: PropTypes.bool,

    /** Whether or not the item has a subtree. */
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
