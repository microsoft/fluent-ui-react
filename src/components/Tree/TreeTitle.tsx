import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
} from '../../lib'
import { treeTitleBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps } from '../../../types/utils'

export interface TreeTitleProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default treeTitleBehavior
   */
  accessibility?: Accessibility

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean

  /** Whether or not the item has a subtree. */
  hasSubtree?: boolean
}

class TreeTitle extends UIComponent<ReactProps<TreeTitleProps>> {
  static create: Function

  static className = 'ui-tree__title'

  static displayName = 'TreeTitle'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    accessibility: PropTypes.func,
    open: PropTypes.bool,
    hasSubtree: PropTypes.bool,
  }

  public static defaultProps = {
    as: 'a',
    href: '#',
    accessibility: treeTitleBehavior,
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

TreeTitle.create = createShorthandFactory(TreeTitle, 'content')

export default TreeTitle
