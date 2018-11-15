import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'

export type TreeTitleProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  active?: boolean
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
  }

  public static defaultProps = {
    as: 'a',
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { children, content } = this.props

    return (
      <ElementType {...rest} className={classes.root} onClick={this.handleClick}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

TreeTitle.create = createShorthandFactory(TreeTitle, content => ({ content }))

export default TreeTitle
