import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import Tree from './Tree'
import TreeTitle from './TreeTitle'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import {
  ComponentEventHandler,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../../types/utils'
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

export interface TreeListItemProps
  extends UIComponentProps<any, any>,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Shorthand array of props for sub tree. */
  subtree?: any[]

  /** Whether or not the subtree of the item is in the open state. */
  active?: boolean

  /** Custom styles to be applied to the tree title. */
  titleStyles?: ComponentSlotStyle

  /** Custom variables to be applied to the tree title. */
  titleVariables?: ComponentVariablesInput

  /**
   * Called when a tree title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All title props.
   */
  onItemClick?: ComponentEventHandler<TreeListItemProps>

  /** Shorthand for content when the item is in an open state. */
  activeContent?: ShorthandValue

  /**
   * A custom render iterator for rendering each Accordion panel title.
   * The default component, props, and children are available for each panel title.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderTitle?: ShorthandRenderFunction
}

class TreeListItem extends UIComponent<TreeListItemProps, any> {
  static create: Function

  static className = 'ui-tree-list__item'

  static displayName = 'TreeListItem'

  state = {
    active: this.props.active,
  }

  static propTypes = {
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
    titleStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    titleVariables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    subtree: PropTypes.array,
    active: PropTypes.bool,
    activeContent: PropTypes.any,
    renderTitle: PropTypes.func,
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
    const { subtree, content, titleStyles, titleVariables, renderTitle } = this.props
    let { activeContent } = this.props
    const { active } = this.state
    if (_.isUndefined(activeContent)) {
      activeContent = content
    }
    const children = []
    children.push(
      TreeTitle.create(content, {
        defaultProps: {
          href: '#',
          styles: titleStyles,
          variables: titleVariables,
          active,
          hasSubtree: !!(subtree && subtree.length),
        },
        render: renderTitle,
        overrideProps: this.handleItemOverrides,
      }),
    )
    subtree &&
      active &&
      children.push(
        Tree.create('', {
          defaultProps: {
            items: subtree,
            className: 'sub-tree',
            isSubTree: true,
            style: {
              display: active ? 'block' : 'none',
            },
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

TreeListItem.create = createShorthandFactory(TreeListItem, 'content')

export default TreeListItem
