import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeListItem from './TreeListItem'
import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import { ComponentEventHandler, ShorthandValue } from '../../../types/utils'

export type TreeProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  treedata: {
    title: ShorthandValue
    onItemClick?: ComponentEventHandler<TreeProps>
    subtree?: any[]
  }[]
}

class Tree extends UIComponent<TreeProps, any> {
  static create: Function

  static className = 'tree-list'

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

    /** Shorthand array of props for Tree. */
    treedata: PropTypes.array,
  }

  public static defaultProps = {
    as: 'ul',
  }

  renderContent(styles, variables) {
    const { treedata } = this.props
    if (!treedata) return []
    return treedata.map(obj => {
      const subtree = obj.subtree
      return TreeListItem.create(obj.title, {
        defaultProps: {
          styles: styles.listItem,
          subtree,
          variables: variables.listItem,
          titleStyles: styles.title,
          titleVariables: variables.title,
          onItemClick: obj.onItemClick,
        },
      })
    })
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderContent(styles, variables)}
      </ElementType>
    )
  }
}

Tree.create = createShorthandFactory(Tree, 'content')

export default Tree
