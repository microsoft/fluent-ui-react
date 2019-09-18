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
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
  Omit,
} from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { menuItemBehavior } from '../../lib/accessibility'

import Box, { BoxProps } from '../Box/Box'
import Icon, { IconProps } from '../Icon/Icon'
import Popup, { PopupProps } from '../Popup/Popup'

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

  /** A slot for a selected indicator in the dropdown list. */
  activeIndicator?: ShorthandValue<IconProps>

  /** A toolbar item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<IconProps>

  /** ToolbarMenuItem index inside ToolbarMenu. */
  index?: number

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /**
   * Attaches a `Popup` component to the ToolbarMenuItem.
   * Accepts all props as a `Popup`, except `trigger` and `children`.
   * Traps focus by default.
   * @see PopupProps
   */
  popup?: Omit<PopupProps, 'trigger' | 'children'> | string

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>
}

export interface ToolbarMenuItemSlotClassNames {
  activeIndicator: string
  wrapper: string
}

class ToolbarMenuItem extends UIComponent<WithAsProp<ToolbarMenuItemProps>> {
  static displayName = 'ToolbarMenuItem'

  static className = 'ui-toolbar__menuitem'

  static slotClassNames: ToolbarMenuItemSlotClassNames = {
    activeIndicator: `${ToolbarMenuItem.className}__activeIndicator`,
    wrapper: `${ToolbarMenuItem.className}__wrapper`,
  }

  static create: ShorthandFactory<ToolbarMenuItemProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    activeIndicator: customPropTypes.itemShorthand,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    index: PropTypes.number,
    onClick: PropTypes.func,
    popup: PropTypes.oneOfType([
      PropTypes.shape({
        ...Popup.propTypes,
        trigger: customPropTypes.never,
        children: customPropTypes.never,
      }),
      PropTypes.string,
    ]),
    wrapper: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'button',
    accessibility: menuItemBehavior as Accessibility,
    activeIndicator: 'stardust-checkmark',
    wrapper: { as: 'li' },
  }

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles }) {
    const {
      active,
      activeIndicator,
      children,
      content,
      disabled,
      icon,
      popup,
      wrapper,
    } = this.props

    const elementType = (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        disabled={disabled}
        className={classes.root}
        onClick={this.handleClick}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {Icon.create(icon, { defaultProps: { xSpacing: !!content ? 'after' : 'none' } })}
            {content}
            {active &&
              Icon.create(activeIndicator, {
                defaultProps: {
                  className: ToolbarMenuItem.slotClassNames.activeIndicator,
                  styles: styles.activeIndicator,
                },
              })}
          </>
        )}
      </ElementType>
    )

    const hasChildren = childrenExist(children)

    if (popup && !hasChildren) {
      return Popup.create(popup, {
        defaultProps: {
          trapFocus: true,
        },
        overrideProps: {
          trigger: elementType,
          children: undefined, // force-reset `children` defined for `Popup` as it collides with the `trigger`
        },
      })
    }

    const menuItemInner = hasChildren ? children : elementType

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
