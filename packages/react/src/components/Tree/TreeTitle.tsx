import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref, handleRef } from '@stardust-ui/react-component-ref'

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

export interface TreeTitleProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default treeTitleBehavior
   */
  accessibility?: Accessibility

  /** Ref to the clickable element that contains the title. */
  contentRef?: React.Ref<HTMLElement>

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

class TreeTitle extends UIComponent<WithAsProp<TreeTitleProps>> {
  static create: Function

  static className = 'ui-tree__title'

  static displayName = 'TreeTitle'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    contentRef: customPropTypes.ref,
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
    expandOrFocusFirstChild: e => {
      const { open } = this.props
      e.preventDefault()
      if (!open) {
        e.stopPropagation()
        this.handleClick(e)
      }
    },
    collapseOrFocusParent: e => {
      const { open } = this.props
      e.preventDefault()
      if (open) {
        e.stopPropagation()
        this.handleClick(e)
      }
    },
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children, content, contentRef } = this.props
    const element = (
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

    return contentRef ? (
      <Ref
        innerRef={(titleElement: HTMLElement) => {
          handleRef(contentRef, titleElement)
        }}
      >
        {element}
      </Ref>
    ) : (
      element
    )
  }
}

TreeTitle.create = createShorthandFactory({ Component: TreeTitle, mappedProp: 'content' })

export default withSafeTypeForAs<typeof TreeTitle, TreeTitleProps, 'a'>(TreeTitle)
