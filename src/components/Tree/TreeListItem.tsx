import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle from './TreeTitle'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import { ComponentEventHandler, ShorthandValue } from '../../../types/utils'

export type TreeListItemProps = {
  as?: any
  children?: React.ReactChildren
  content?: React.ReactNode
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  subtree?: any[]
  active?: boolean
  titleStyles?: ComponentSlotStyle
  titleVariables?: ComponentVariablesInput
  onItemClick?: ComponentEventHandler<TreeListItemProps>
  activeContent?: ShorthandValue
}

class TreeListItem extends UIComponent<TreeListItemProps, any> {
  static create: Function

  static className = 'tree-list__item'

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

    /** Custom styles to be applied to the tree title. */
    titleStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied to the tree title. */
    titleVariables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Shorthand array of props for sub tree. */
    subtree: PropTypes.array,

    /** Whether or not the subtree of the item is in the open state. */
    active: PropTypes.bool,

    /** Shorthand for content when the item is in an open state. */
    activeContent: PropTypes.any,

    /**
     * Called when a tree title is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All title props.
     */
    onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
  }

  public static defaultProps = {
    as: 'li',
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, titleProps) => {
      e.preventDefault()
      this.setState({
        active: !this.state.active,
      })
      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onItemClick', e, titleProps)
    },
  })

  renderContent(styles, variables) {
    const { subtree, content, titleStyles, titleVariables } = this.props
    let { activeContent } = this.props
    const { active } = this.state
    if (_.isUndefined(activeContent)) {
      activeContent = content
    }
    const children = []
    children.push(
      TreeTitle.create(
        { content: active ? activeContent : content },
        {
          defaultProps: {
            href: '#',
            styles: titleStyles,
            variables: titleVariables,
            active,
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
