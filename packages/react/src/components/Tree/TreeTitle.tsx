import * as customPropTypes from '@stardust-ui/react-proptypes'
import { Ref, handleRef } from '@stardust-ui/react-component-ref'
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

  /** Title must be able to focus first child title if it exists. */
  focusFirstChild?: Function

  /** Ref to the clickable element that will be used by parent title to focus this child. */
  firstTitleChildRef?: React.Ref<HTMLElement>

  /** Title must have a function to focus the parent title. */
  focusParent?: Function

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
    firstTitleChildRef: customPropTypes.ref,
    focusFirstChild: PropTypes.func,
    focusParent: PropTypes.func,
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
    expandOrFocusFirstChild: e => {
      const { open } = this.props
      e.preventDefault()
      if (open) {
        this.focusFirstChild()
      } else {
        this.handleClick(e)
      }
    },
    collapseOrFocusParent: e => {
      const { open } = this.props
      e.preventDefault()
      if (open) {
        this.handleClick(e)
      } else {
        this.focusParent()
      }
    },
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private focusFirstChild = () => {
    _.invoke(this.props, 'focusFirstChild')
  }

  private focusParent = () => {
    _.invoke(this.props, 'focusParent')
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, variables }) {
    const { children, content, contentRef, firstTitleChildRef } = this.props
    const component = (
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
          handleRef(firstTitleChildRef, titleElement)
        }}
      >
        {component}
      </Ref>
    ) : (
      component
    )
  }
}

TreeTitle.create = createShorthandFactory({ Component: TreeTitle, mappedProp: 'content' })

export default withSafeTypeForAs<typeof TreeTitle, TreeTitleProps, 'a'>(TreeTitle)
