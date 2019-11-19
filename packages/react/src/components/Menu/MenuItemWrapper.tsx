import { Accessibility } from '@stardust-ui/accessibility'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../lib'

import { ComponentEventHandler, WithAsProp, withSafeTypeForAs } from '../../types'
import MenuItem from './MenuItem'
import cx from 'classnames'
import { useKeyOnly, useValueAndKey } from '../../lib/classNameBuilders'

export interface MenuItemWrapperProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** A menu item can be active. */
  active?: boolean

  /** A menu item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** A menu may have just icons. */
  iconOnly?: boolean

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<MenuItemWrapperProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<MenuItemWrapperProps>

  /**
   * Called after item blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<MenuItemWrapperProps>

  /** A menu can adjust its appearance to de-emphasize its contents. */
  pills?: boolean

  /**
   * A menu can point to show its relationship to nearby content.
   * For vertical menu, it can point to the start of the item or to the end.
   */
  pointing?: boolean | 'start' | 'end'

  /** The menu item can have primary type. */
  primary?: boolean

  /** The menu item can have secondary type. */
  secondary?: boolean

  /** Menu items can by highlighted using underline. */
  underlined?: boolean

  /** A vertical menu displays elements vertically. */
  vertical?: boolean

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean
}

class MenuItemWrapper extends UIComponent<WithAsProp<MenuItemWrapperProps>, any> {
  static create: ShorthandFactory<MenuItemWrapperProps>

  static className = `${MenuItem.className}__wrapper`

  static displayName = 'MenuItemWrapper'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
  }

  static defaultProps = {
    as: 'li',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps, theme }) {
    const {
      children,
      content,
      primary,
      iconOnly,
      disabled,
      vertical,
      active,
      pills,
      underlined,
      inSubmenu,
      pointing,
    } = this.props

    const propClasses = cx(
      theme.name, // UGLY
      useKeyOnly(primary, 'primary'),
      useKeyOnly(iconOnly, 'iconOnly'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(vertical, 'vertical'),
      useKeyOnly(active, 'active'),
      useKeyOnly(pills, 'pills'),
      useKeyOnly(underlined, 'underlined'),
      useKeyOnly(inSubmenu, 'inSubmenu'),
      useValueAndKey(pointing, 'pointing'),
    )

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={cx(MenuItemWrapper.className, propClasses, classes.root)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

MenuItemWrapper.create = createShorthandFactory({
  Component: MenuItemWrapper,
  mappedProp: 'content',
})

/**
 * A MenuItemWrapper provides more detailed information about the Header.
 */
export default withSafeTypeForAs<typeof MenuItemWrapper, MenuItemWrapperProps, 'li'>(
  MenuItemWrapper,
)
