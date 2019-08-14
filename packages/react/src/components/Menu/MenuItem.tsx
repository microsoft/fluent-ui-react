import { documentRef, EventListener } from '@stardust-ui/react-component-event-listener'
import { Ref } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  createShorthandFactory,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  isFromKeyboard,
  rtlTextContainer,
  applyAccessibilityKeyHandlers,
} from '../../lib'
import Icon, { IconProps } from '../Icon/Icon'
import Menu, { MenuProps, MenuShorthandKinds } from './Menu'
import Box, { BoxProps } from '../Box/Box'
import { menuItemBehavior, submenuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandValue,
  ShorthandCollection,
  withSafeTypeForAs,
} from '../../types'
import { focusAsync } from '../../lib/accessibility/FocusZone'
import { Popper } from '../../lib/positioner'

export interface MenuItemSlotClassNames {
  wrapper: string
  submenu: string
}

export interface MenuItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available menuItemAsToolbarButtonBehavior, tabBehavior
   */
  accessibility?: Accessibility

  /** A menu item can be active. */
  active?: boolean

  /** A menu item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Menu Item Icon */
  icon?: ShorthandValue<IconProps>

  /** A menu may have just icons. */
  iconOnly?: boolean

  /** MenuItem index inside Menu. */
  index?: number

  /** MenuItem position inside Menu (skipping separators). */
  itemPosition?: number

  /** MenuItem count inside Menu. */
  itemsCount?: number

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<MenuItemProps>

  /**
   * Called after user's focus.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus?: ComponentEventHandler<MenuItemProps>

  /**
   * Called after item blur.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur?: ComponentEventHandler<MenuItemProps>

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

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>

  /** Shorthand for the submenu. */
  menu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps, MenuShorthandKinds>

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean

  /** Default menu open */
  defaultMenuOpen?: boolean

  /** Callback for setting the current menu item as active element in the menu. */
  onActiveChanged?: ComponentEventHandler<MenuItemProps>

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean

  /** Shorthand for the submenu indicator. */
  indicator?: ShorthandValue<IconProps>

  /**
   * Event for request to change 'open' value.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onMenuOpenChange?: ComponentEventHandler<MenuItemProps>
}

export interface MenuItemState {
  isFromKeyboard: boolean
  menuOpen: boolean
}

class MenuItem extends AutoControlledComponent<WithAsProp<MenuItemProps>, MenuItemState> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static slotClassNames: MenuItemSlotClassNames = {
    submenu: `${MenuItem.className}__submenu`,
    wrapper: `${MenuItem.className}__wrapper`,
  }

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthandWithoutJSX,
    iconOnly: PropTypes.bool,
    index: PropTypes.number,
    itemPosition: PropTypes.number,
    itemsCount: PropTypes.number,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    pills: PropTypes.bool,
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
    wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
    menuOpen: PropTypes.bool,
    defaultMenuOpen: PropTypes.bool,
    onActiveChanged: PropTypes.func,
    inSubmenu: PropTypes.bool,
    indicator: customPropTypes.itemShorthand,
    onMenuOpenChange: PropTypes.func,
  }

  static defaultProps = {
    as: 'a',
    accessibility: menuItemBehavior as Accessibility,
    wrapper: { as: 'li' },
  }

  static autoControlledProps = ['menuOpen']

  menuRef = React.createRef<HTMLElement>()
  itemRef = React.createRef<HTMLElement>()

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles }) {
    const {
      children,
      content,
      icon,
      wrapper,
      menu,
      primary,
      secondary,
      active,
      vertical,
      indicator,
      disabled,
    } = this.props
    const indicatorWithDefaults = indicator === undefined ? {} : indicator

    const { menuOpen } = this.state

    const menuItemInner = childrenExist(children) ? (
      children
    ) : (
      <Ref innerRef={this.itemRef}>
        <ElementType
          className={classes.root}
          disabled={disabled}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...accessibility.attributes.root}
          {...accessibility.keyHandlers.root}
          {...unhandledProps}
          {...(!wrapper && { onClick: this.handleClick })}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {icon &&
            Icon.create(this.props.icon, {
              defaultProps: {
                xSpacing: !!content ? 'after' : 'none',
                styles: styles.icon,
              },
            })}
          {rtlTextContainer.createFor({ element: content })}
          {menu &&
            Icon.create(indicatorWithDefaults, {
              defaultProps: {
                name: vertical ? 'stardust-arrow-end' : 'stardust-arrow-down',
                styles: styles.indicator,
              },
            })}
        </ElementType>
      </Ref>
    )
    const maybeSubmenu =
      menu && active && menuOpen ? (
        <>
          <Ref innerRef={this.menuRef}>
            <Popper
              align={vertical ? 'top' : 'start'}
              position={vertical ? 'after' : 'below'}
              targetRef={this.itemRef}
            >
              {Menu.create(menu, {
                defaultProps: {
                  accessibility: submenuBehavior,
                  className: MenuItem.slotClassNames.submenu,
                  vertical: true,
                  primary,
                  secondary,
                  styles: styles.menu,
                  submenu: true,
                  indicator,
                },
              })}
            </Popper>
          </Ref>
          <EventListener listener={this.outsideClickHandler} targetRef={documentRef} type="click" />
        </>
      ) : null

    if (wrapper) {
      return Box.create(wrapper, {
        defaultProps: {
          className: cx(MenuItem.slotClassNames.wrapper, classes.wrapper),
          ...accessibility.attributes.wrapper,
          ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, wrapper),
        },
        overrideProps: () => ({
          children: (
            <>
              {menuItemInner}
              {maybeSubmenu}
            </>
          ),
          onClick: this.handleClick,
          onBlur: this.handleWrapperBlur,
        }),
      })
    }
    return menuItemInner
  }

  handleWrapperBlur = e => {
    if (!this.props.inSubmenu && !e.currentTarget.contains(e.relatedTarget)) {
      this.trySetMenuOpen(false, e)
    }
  }

  actionHandlers = {
    performClick: event => !event.defaultPrevented && this.handleClick(event),
    openMenu: event => this.openMenu(event),
    closeAllMenusAndFocusNextParentItem: event => this.closeAllMenus(event),
    closeMenu: event => this.closeMenu(event),
    closeMenuAndFocusTrigger: event => this.closeMenu(event, true),
    doNotNavigateNextParentItem: event => {
      event.stopPropagation()
    },
  }

  outsideClickHandler = e => {
    if (!this.isSubmenuOpen()) return
    if (
      !doesNodeContainClick(this.itemRef.current, e) &&
      !doesNodeContainClick(this.menuRef.current, e)
    ) {
      this.trySetMenuOpen(false, e)
    }
  }

  performClick = e => {
    const { active, menu, inSubmenu } = this.props

    if (menu) {
      if (doesNodeContainClick(this.menuRef.current, e)) {
        // submenu was clicked => close it and propagate
        this.trySetMenuOpen(false, e, () => focusAsync(this.itemRef.current))
      } else {
        // the menuItem element was clicked => toggle the open/close and stop propagation
        this.trySetMenuOpen(active ? !this.state.menuOpen : true, e)
        e.stopPropagation()
        e.preventDefault()
      }
    }

    // avoid spacebar scrolling the page
    if (!inSubmenu) {
      e.preventDefault()
    }
  }

  handleClick = (e: Event | React.SyntheticEvent) => {
    const { disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    this.performClick(e)
    _.invoke(this.props, 'onClick', e, this.props)
  }

  handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  isSubmenuOpen = (): boolean => {
    const { menu } = this.props
    const { menuOpen } = this.state

    return !!(menu && menuOpen)
  }

  closeAllMenus = (e: Event) => {
    if (!this.isSubmenuOpen()) {
      return
    }
    const { inSubmenu } = this.props
    this.trySetMenuOpen(false, e, () => {
      if (!inSubmenu && this.props.vertical) {
        focusAsync(this.itemRef.current)
      }
    })
  }

  closeMenu = (e: Event, forceTriggerFocus?: boolean) => {
    if (!this.isSubmenuOpen()) {
      return
    }

    const { inSubmenu } = this.props
    const shouldStopPropagation = inSubmenu || this.props.vertical
    this.trySetMenuOpen(false, e, () => {
      if (forceTriggerFocus || shouldStopPropagation) {
        focusAsync(this.itemRef.current)
      }
    })

    if (forceTriggerFocus || shouldStopPropagation) {
      e.stopPropagation()
    }
  }

  openMenu = (e: Event) => {
    const { menu } = this.props
    const { menuOpen } = this.state
    if (menu && !menuOpen) {
      this.trySetMenuOpen(true, e)
      _.invoke(this.props, 'onActiveChanged', e, { ...this.props, active: true })
      e.stopPropagation()
      e.preventDefault()
    }
  }

  trySetMenuOpen(newValue: boolean, e: Event | React.SyntheticEvent, onStateChanged?: any) {
    this.trySetState({ menuOpen: newValue })
    // The reason why post-effect is not passed as callback to trySetState method
    // is that in 'controlled' mode the post-effect is applied before final re-rendering
    // which cause a broken behavior: for e.g. when it is needed to focus submenu trigger on ESC.
    // TODO: all DOM post-effects should be applied at componentDidMount & componentDidUpdated stages.
    onStateChanged && onStateChanged()
    _.invoke(this.props, 'onMenuOpenChange', e, {
      ...this.props,
      menuOpen: newValue,
    })
  }
}

MenuItem.create = createShorthandFactory({ Component: MenuItem, mappedProp: 'content' })

/**
 * A MenuItem is an actionable item within a Menu.
 */
export default withSafeTypeForAs<typeof MenuItem, MenuItemProps, 'a'>(MenuItem)
