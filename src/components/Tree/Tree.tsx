import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import TreeListItem from './TreeListItem'
import { UIComponent, childrenExist, createShorthandFactory } from '../../lib'
import { ComponentEventHandler, ShorthandValue } from '../../../types/utils'
import { treeBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { commonUIComponentPropTypes, childrenComponentPropTypes } from '../../lib/commonPropTypes'
import { UIComponentProps, ChildrenComponentProps } from '../../lib/commonPropInterfaces'

export interface TreeProps extends UIComponentProps<any, any>, ChildrenComponentProps {
  /** Shorthand array of props for Tree. */
  treedata: {
    title: ShorthandValue
    onItemClick?: ComponentEventHandler<TreeProps>
    subtree?: any[]
  }[]

  /** Whether the tree is a subtree. */
  isSubTree?: boolean
}

class Tree extends UIComponent<TreeProps, any> {
  static create: Function

  static className = 'tree-list'

  static displayName = 'Tree'

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    treedata: PropTypes.array,
    isSubTree: PropTypes.boolean,
  }

  public static defaultProps = {
    as: 'ul',
    accessibility: treeBehavior as Accessibility,
  }

  renderContent(styles, variables) {
    const { treedata } = this.props
    if (!treedata) return []
    return _.map(treedata, obj => {
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

  renderComponent({ ElementType, classes, accessibility, rest, styles, variables }) {
    const { children } = this.props

    return (
      <ElementType {...rest} className={classes.root} {...accessibility.attributes.root}>
        {childrenExist(children) ? children : this.renderContent(styles, variables)}
      </ElementType>
    )
  }
}

Tree.create = createShorthandFactory(Tree, 'content')

export default Tree
