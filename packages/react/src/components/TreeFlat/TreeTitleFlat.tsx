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
import { Accessibility } from '../../lib/accessibility/types'
import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'

export interface TreeTitleFlatProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<TreeTitleFlatProps>

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean

  /** Whether or not the item has a subtree. */
  hasSubtree?: boolean
}

class TreeTitleFlat extends UIComponent<WithAsProp<TreeTitleFlatProps>> {
  static create: Function

  static className = 'ui-treeflat__title'

  static displayName = 'FlatTreeTitle'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    onClick: PropTypes.func,
    open: PropTypes.bool,
    hasSubtree: PropTypes.bool,
  }

  static defaultProps = {
    as: 'a',
    accessibility: treeTitleBehavior,
  }

  actionHandlers = {
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

TreeTitleFlat.create = createShorthandFactory({ Component: TreeTitleFlat, mappedProp: 'content' })

/**
 * A TreeTitle renders a title of TreeItem.
 */
export default withSafeTypeForAs<typeof TreeTitleFlat, TreeTitleFlatProps, 'a'>(TreeTitleFlat)
