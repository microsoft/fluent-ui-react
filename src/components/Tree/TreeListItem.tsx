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
  titleStyles?: any
  titleVariables?: any
  onItemClick?: Function
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

    titleStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    titleVariables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    subtree: PropTypes.array,
    active: PropTypes.bool,

    onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
  }

  public static defaultProps = {
    as: 'li',
  }

  handleItemOverrides = predefinedProps => ({
    onClick: e => {
      e.preventDefault()
      this.setState({
        active: !this.state.active,
      })
      _.invoke(predefinedProps, 'onClick', e)
      _.invoke(this.props, 'onItemClick', e)
    },
  })

  renderContent(styles, variables) {
    const { subtree, content, titleStyles, titleVariables } = this.props
    const { active } = this.state
    const children = []
    children.push(
      TreeTitle.create(
        { content },
        {
          defaultProps: {
            href: '#',
            styles: titleStyles,
            variables: titleVariables,
          },
          overrideProps: this.handleItemOverrides,
        },
      ),
    )
    subtree &&
      active &&
      children.push(
        Tree.create('', {
          defaultProps: {
            treedata: subtree,
            className: 'sub-tree',
          },
        }),
      )
    return children
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

TreeListItem.create = createShorthandFactory(TreeListItem, content => ({ content }))

export default TreeListItem
