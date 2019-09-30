import * as React from 'react'
import * as _ from 'lodash'
import cx from 'classnames'
import * as PropTypes from 'prop-types'

import { EventListener } from '@stardust-ui/react-component-event-listener'
import { Ref, toRefObject } from '@stardust-ui/react-component-ref'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import {
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  AutoControlledComponent,
  UIComponentProps,
  createShorthandFactory,
  childrenExist,
  applyAccessibilityKeyHandlers,
  ShorthandFactory,
  doesNodeContainClick,
} from '../../lib'
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
  Omit,
  ShorthandCollection,
} from '../../types'
import { Accessibility } from '../../lib/accessibility/types'
import { toolbarMenuItemBehavior, submenuBehavior } from '../../lib/accessibility'
import { Popper } from '../../lib/positioner'

import Box, { BoxProps } from '../Box/Box'
import Icon, { IconProps } from '../Icon/Icon'
import Popup, { PopupProps } from '../Popup/Popup'
import {
  ToolbarMenuProps,
  ToolbarMenuItemShorthandKinds,
  default as ToolbarMenu,
} from './ToolbarMenu'
import { focusAsync } from '../../lib/accessibility/FocusZone'

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

  /**
   * Called on item click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: ComponentEventHandler<ToolbarMenuItemProps>

  /** Name or shorthand for Toolbar Item Icon */
  icon?: ShorthandValue<IconProps>

  /** ToolbarMenuItem index inside ToolbarMenu. */
  index?: number

  /** Shorthand for the submenu indicator. */
  indicator?: ShorthandValue<IconProps>

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean

  /** Shorthand for the submenu. */
  menu?:
    | ShorthandValue<ToolbarMenuProps>
    | ShorthandCollection<ToolbarMenuItemProps, ToolbarMenuItemShorthandKinds>

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean

  /** Default menu open */
  defaultMenuOpen?: boolean

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

export interface ToolbarMenuItemState {
  menuOpen: boolean
}

export interface ToolbarMenuItemSlotClassNames {
  activeIndicator: string
  wrapper: string
  submenu: string
}

class ToolbarMenuItem extends AutoControlledComponent<
  WithAsProp<ToolbarMenuItemProps>,
  ToolbarMenuItemState
> {
  static displayName = 'ToolbarMenuItem'

  static className = 'ui-toolbar__menuitem'

  static slotClassNames: ToolbarMenuItemSlotClassNames = {
    activeIndicator: `${ToolbarMenuItem.className}__activeIndicator`,
    wrapper: `${ToolbarMenuItem.className}__wrapper`,
    submenu: `${ToolbarMenuItem.className}__submenu`,
  }

  static create: ShorthandFactory<ToolbarMenuItemProps>

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    activeIndicator: customPropTypes.itemShorthand,
    defaultMenuOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    index: PropTypes.number,
    indicator: customPropTypes.itemShorthandWithoutJSX,
    inSubmenu: PropTypes.bool,
    menu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
    menuOpen: PropTypes.bool,
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
    accessibility: toolbarMenuItemBehavior as Accessibility,
    activeIndicator: 'stardust-checkmark',
    wrapper: { as: 'li' },
  }

  static autoControlledProps = ['menuOpen']

  menuRef = React.createRef<HTMLElement>()
  itemRef = React.createRef<HTMLElement>()

  actionHandlers = {
    performClick: event => {
      event.preventDefault()
      this.handleClick(event)
    },
    openMenu: event => this.openMenu(event),
    closeAllMenusAndFocusNextParentItem: event => this.closeAllMenus(event),
    closeMenu: event => this.closeMenu(event),
    closeMenuAndFocusTrigger: event => this.closeMenu(event),
    doNotNavigateNextParentItem: event => {
      event.stopPropagation()
    },
    closeAllMenus: event => this.closeAllMenus(event),
  }

  openMenu = (e: Event) => {
    const { menu } = this.props
    const { menuOpen } = this.state
    if (menu && !menuOpen) {
      this.trySetMenuOpen(true, e)
      e.stopPropagation()
      e.preventDefault()
    }
  }

  closeMenu = (e: Event) => {
    if (!this.isSubmenuOpen()) {
      return
    }

    this.trySetMenuOpen(false, e, () => {
      focusAsync(this.itemRef.current)
    })

    e.stopPropagation()
  }

  closeAllMenus = (e: Event) => {
    if (!this.isSubmenuOpen()) {
      return
    }
    const { inSubmenu } = this.props
    this.trySetMenuOpen(false, e, () => {
      if (!inSubmenu) {
        focusAsync(this.itemRef.current)
      }
    })

    // avoid spacebar scrolling the page
    if (!inSubmenu) {
      e.preventDefault()
    }
  }

  isSubmenuOpen = (): boolean => {
    const { menu } = this.props
    const { menuOpen } = this.state

    return !!(menu && menuOpen)
  }

  trySetMenuOpen(newValue: boolean, e: Event | React.SyntheticEvent, onStateChanged?: any) {
    this.setState({ menuOpen: newValue })
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

  outsideClickHandler = e => {
    if (!this.isSubmenuOpen()) return
    if (
      !doesNodeContainClick(this.itemRef.current, e, this.context.target) &&
      !doesNodeContainClick(this.menuRef.current, e, this.context.target)
    ) {
      this.trySetMenuOpen(false, e)
    }
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps, styles, rtl }) {
    const {
      active,
      activeIndicator,
      children,
      content,
      disabled,
      indicator,
      icon,
      menu,
      popup,
      wrapper,
      onItemClick,
    } = this.props
    const { menuOpen } = this.state

    const indicatorWithDefaults = indicator === undefined ? 'stardust-menu-arrow-end' : indicator
    const targetRef = toRefObject(this.context.target)

    const elementType = (
      <Ref innerRef={this.itemRef}>
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
              {menu &&
                Icon.create(indicatorWithDefaults, {
                  defaultProps: {
                    name: 'stardust-menu-arrow-end',
                    styles: styles.indicator,
                  },
                })}
            </>
          )}
        </ElementType>
      </Ref>
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

    const maybeSubmenu =
      menu && menuOpen ? (
        <>
          <Ref innerRef={this.menuRef}>
            <Popper align="top" position={rtl ? 'before' : 'after'} targetRef={this.itemRef}>
              {ToolbarMenu.create(menu, {
                defaultProps: {
                  accessibility: submenuBehavior,
                  className: ToolbarMenuItem.slotClassNames.submenu,
                  onItemClick,
                  styles: styles.menu,
                  submenu: true,
                  indicator,
                },
              })}
            </Popper>
          </Ref>
          <EventListener listener={this.outsideClickHandler} targetRef={targetRef} type="click" />
        </>
      ) : null

    if (!wrapper) {
      return menuItemInner
    }

    return Box.create(wrapper, {
      defaultProps: {
        className: cx(ToolbarMenuItem.slotClassNames.wrapper, classes.wrapper),
        ...accessibility.attributes.wrapper,
        ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.wrapper, unhandledProps),
      },
      overrideProps: () => ({
        children: (
          <>
            {menuItemInner}
            {maybeSubmenu}
          </>
        ),
      }),
    })
  }

  handleClick = (e: MouseEvent) => {
    const { disabled, menu } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (menu) {
      if (doesNodeContainClick(this.menuRef.current, e, this.context.target)) {
        // submenu was clicked => close it and propagate
        this.trySetMenuOpen(false, e, () => focusAsync(this.itemRef.current))
      } else {
        // the menuItem element was clicked => toggle the open/close and stop propagation
        this.trySetMenuOpen(!this.state.menuOpen, e)
        e.stopPropagation()
        e.preventDefault()
      }
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
