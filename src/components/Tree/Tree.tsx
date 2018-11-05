import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'

export type TreeProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

class Tree extends UIComponent<TreeProps, any> {
  static create: Function

  static className = 'ui-tree'

  static displayName = 'Tree'

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
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Tree.create = createShorthandFactory(Tree, content => ({ content }))

export default Tree
