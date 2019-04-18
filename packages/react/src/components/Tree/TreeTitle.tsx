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
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { treeTitleBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ComponentEventHandler, ReactProps } from '../../types'

export interface TreeTitleProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default treeTitleBehavior
   */
  accessibility?: Accessibility

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<TreeTitleProps>

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
    onClick: PropTypes.func,
    open: PropTypes.bool,
    hasSubtree: PropTypes.bool,
  }

  public static defaultProps = {
    as: 'a',
    accessibility: treeTitleBehavior,
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: e => {
      e.preventDefault()
      this.handleClick(e)
    },
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
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

TreeTitle.create = createShorthandFactory({ Component: TreeTitle, mappedProp: 'content' })

export default TreeTitle
