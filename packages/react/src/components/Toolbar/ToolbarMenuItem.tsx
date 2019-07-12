import * as React from 'react'
import * as _ from 'lodash'
import cx from 'classnames'
import * as PropTypes from 'prop-types'

import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  UIComponent,
  UIComponentProps,
  createShorthandFactory,
  childrenExist,
  isFromKeyboard,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import { ComponentEventHandler, ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { menuItemBehavior } from '../../lib/accessibility'

import Box from '../Box/Box'
import Icon from '../Icon/Icon'

export interface ToolbarMenuItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A toolbar item can be active. */
  active?: boolean

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<ToolbarMenuItemProps>

  /**
   * Called after item blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<ToolbarMenuItemProps>

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue
}

export interface ToolbarMenuItemState {
  isFromKeyboard: boolean
}

export interface ToolbarMenuItemSlotClassNames {
  wrapper: string
}

class ToolbarMenuItem extends UIComponent<WithAsProp<ToolbarMenuItemProps>, ToolbarMenuItemState> {
  static displayName = 'ToolbarMenuItem'

  static className = 'ui-toolbar__menuitem'

  static slotClassNames: ToolbarMenuItemSlotClassNames = {
    wrapper: `${ToolbarMenuItem.className}__wrapper`,
  }

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    wrapper: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'button',
    accessibility: menuItemBehavior as Accessibility,
    wrapper: { as: 'li' },
  }

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children, content, disabled, icon, wrapper } = this.props

    const menuItemInner = childrenExist(children) ? (
      children
    ) : (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        disabled={disabled}
        className={classes.root}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {Icon.create(icon, { defaultProps: { xSpacing: !!content ? 'after' : 'none' } })}
            {content}
          </>
        )}
      </ElementType>
    )

    if (!wrapper) {
      return menuItemInner
    }

    return Box.create(wrapper, {
      defaultProps: {
        className: cx(ToolbarMenuItem.slotClassNames.wrapper, classes.wrapper),
        ...accessibility.attributes.wrapper,
      },
      overrideProps: () => ({
        children: menuItemInner,
      }),
    })
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  handleClick = (e: React.SyntheticEvent) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    _.invoke(this.props, 'onClick', e, this.props)
  }
}

ToolbarMenuItem.create = createShorthandFactory({
  Component: ToolbarMenuItem,
  mappedProp: 'content',
})

/**
 * A ToolbarMenuItem renders ToolbarMenu item as button.
 */
export default withSafeTypeForAs<typeof ToolbarMenuItem, ToolbarMenuItemProps, 'button'>(
  ToolbarMenuItem,
)
