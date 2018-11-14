import * as _ from 'lodash'
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
  subtree?: any
  active?: boolean
}

class TreeListItem extends UIComponent<TreeListItemProps, any> {
  static create: Function

  static className = 'tree-list-item'

  static displayName = 'TreeListItem'

  state = {
    active: this.props.active,
  }

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

    subtree: PropTypes.array,
    active: PropTypes.bool,
  }

  public static defaultProps = {
    as: 'li',
  }

  handleItemOverrides = predefinedProps => ({
    onClick: e => {
      e.preventDefault()
      console.log(e.target)
      console.log(this)
      this.setState({
        active: !this.state.active,
      })
      _.invoke(predefinedProps, 'onClick', e)
      _.invoke(this.props, 'onItemClick', e)
    },
  })

  renderContent() {
    const { subtree, content } = this.props
    const { active } = this.state
    const children = []
    children.push(
      TreeTitle.create(content, {
        defaultProps: {
          href: '#',
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
    subtree &&
      active &&
      children.push(
        Tree.create(content, {
          defaultProps: {
            treedata: subtree,
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
