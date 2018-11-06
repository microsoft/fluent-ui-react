import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle from './TreeTitle'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'

export type TreeListItemProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  submenu?: any
}

class TreeListItem extends UIComponent<TreeListItemProps, any> {
  static create: Function

  static className = 'tree-list-item'

  static displayName = 'TreeListItem'

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

    submenu: PropTypes.array,
  }

  public static defaultProps = {
    as: 'li',
  }

  renderContent() {
    const { submenu, content } = this.props
    const children = []
    children.push(
      TreeTitle.create(content, {
        defaultProps: {
          href: '#',
        },
      }),
    )
    submenu &&
      children.push(
        Tree.create(content, {
          defaultProps: {
            treedata: submenu,
          },
        }),
      )
    return children
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

TreeListItem.create = createShorthandFactory(TreeListItem, content => ({ content }))

export default TreeListItem
