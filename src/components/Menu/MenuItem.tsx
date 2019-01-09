import * as _ from 'lodash'
import cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  doesNodeContainClick,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  isFromKeyboard,
  EventStack,
} from '../../lib'
import Icon from '../Icon/Icon'
import Menu from '../Menu/Menu'
import Slot from '../Slot/Slot'
import { menuItemBehavior, submenuBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ComponentEventHandler, ReactProps, ShorthandValue } from '../../../types/utils'
import { focusAsync } from '../../lib/accessibility/FocusZone'
import Ref from '../Ref/Ref'

export interface MenuItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuItemBehavior
   * @available toolbarButtonBehavior, tabBehavior
   * */
  accessibility?: Accessibility

  /** A menu item can be active. */
  active?: boolean

  /** A menu item can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Name or shorthand for Menu Item Icon */
  icon?: ShorthandValue

  /** A menu may have just icons. */
  iconOnly?: boolean

  /** MenuItem index inside Menu. */
  index?: number

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
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
  wrapper?: ShorthandValue

  /** Shorthand for the submenu. */
  menu?: ShorthandValue

  /** Indicates if the menu inside the item is open. */
  menuOpen?: boolean

  /** Default menu open */
  defaultMenuOpen?: boolean

  /** Callback for setting the current menu item as active element in the menu. */
  onActiveChanged?: ComponentEventHandler<MenuItemProps>

  /** Indicates whether the menu item is part of submenu. */
  inSubmenu?: boolean
}

export interface MenuItemState {
  isFromKeyboard: boolean
  menuOpen: boolean
}

/**
 * A menu item is an actionable navigation item within a menu.
 */
class MenuItem extends AutoControlledComponent<ReactProps<MenuItemProps>, MenuItemState> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon(),
    accessibility: PropTypes.func,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    iconOnly: PropTypes.bool,
    index: PropTypes.number,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    pills: PropTypes.bool,
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
    wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    menu: customPropTypes.itemShorthand,
    menuOpen: PropTypes.bool,
    defaultMenuOpen: PropTypes.bool,
    onActiveChanged: PropTypes.func,
    inSubmenu: PropTypes.bool,
  }

  static defaultProps = {
    as: 'a',
    accessibility: menuItemBehavior as Accessibility,
    wrapper: { as: 'li' },
  }

  static autoControlledProps = ['menuOpen']

  private outsideClickSubscription = EventStack.noSubscription

  private menuRef = React.createRef<HTMLElement>()
  private itemRef = React.createRef<HTMLElement>()

  public componentDidMount() {
    this.updateOutsideClickSubscription()
  }

  public componentDidUpdate() {
    this.updateOutsideClickSubscription()
  }

  public componentWillUnmount() {
    this.outsideClickSubscription.unsubscribe()
  }

  renderComponent({ ElementType, classes, accessibility, rest, styles }) {
    const { children, content, icon, wrapper, menu, primary, secondary, active } = this.props

    const { menuOpen } = this.state

    const menuItemInner = childrenExist(children) ? (
      children
    ) : (
      <Ref innerRef={this.itemRef}>
        <ElementType
          className={classes.root}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...accessibility.attributes.anchor}
          {...rest}
          {...!wrapper && { onClick: this.handleClick }}
        >
          {icon &&
            Icon.create(this.props.icon, {
              defaultProps: { xSpacing: !!content ? 'after' : 'none' },
            })}
          {content}
        </ElementType>
      </Ref>
    )
    const maybeSubmenu =
      menu && active && menuOpen ? (
        <Ref innerRef={this.menuRef}>
          {Menu.create(menu, {
            defaultProps: {
              accessibility: submenuBehavior,
              vertical: true,
              primary,
              secondary,
              styles: styles.menu,
              submenu: true,
            },
          })}
        </Ref>
      ) : null

    if (wrapper) {
      return Slot.create(wrapper, {
        defaultProps: {
          className: cx('ui-menu__item__wrapper', classes.wrapper),
          ...accessibility.attributes.root,
          ...accessibility.keyHandlers.root,
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

  private handleWrapperBlur = e => {
    if (!this.props.inSubmenu && !e.currentTarget.contains(e.relatedTarget)) {
      this.setState({ menuOpen: false })
    }
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
    openMenu: event => this.openMenu(event),
    closeAllMenus: event => this.closeAllMenus(event, false),
    closeAllMenusAndFocusNextParentItem: event => this.closeAllMenus(event, true),
    closeMenu: event => this.closeMenu(event),
  }

  private updateOutsideClickSubscription() {
    this.outsideClickSubscription.unsubscribe()

    if (this.props.menu && this.state.menuOpen) {
      setTimeout(() => {
        this.outsideClickSubscription = EventStack.subscribe('click', this.outsideClickHandler)
      })
    }
  }

  private outsideClickHandler = e => {
    if (!this.state.menuOpen) return
    if (
      !doesNodeContainClick(this.itemRef.current, e) &&
      !doesNodeContainClick(this.menuRef.current, e)
    ) {
      this.trySetState({ menuOpen: false })
    }
  }

  private performClick = e => {
    const { active, menu } = this.props
    if (menu) {
      if (doesNodeContainClick(this.menuRef.current, e)) {
        // submenu was clicked => close it and propagate
        this.setState({ menuOpen: false }, () => focusAsync(this.itemRef.current))
      } else {
        // the menuItem element was clicked => toggle the open/close and stop propagation
        this.trySetState({ menuOpen: active ? !this.state.menuOpen : true })
        e.stopPropagation()
      }
    }
  }

  private handleClick = e => {
    this.performClick(e)
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: false })

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState({ isFromKeyboard: isFromKeyboard() })

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private closeAllMenus = (e, focusNextParent: boolean) => {
    const { menu, inSubmenu } = this.props
    const { menuOpen } = this.state
    if (menu && menuOpen) {
      this.setState({ menuOpen: false }, () => {
        if (!inSubmenu && (!focusNextParent || this.props.vertical)) {
          focusAsync(this.itemRef.current)
        }
      })
    }
  }

  private closeMenu = e => {
    const { menu, inSubmenu } = this.props
    const { menuOpen } = this.state
    const shouldStopPropagation = inSubmenu || this.props.vertical
    if (menu && menuOpen) {
      this.setState({ menuOpen: false }, () => {
        if (shouldStopPropagation) {
          focusAsync(this.itemRef.current)
        }
      })
      if (shouldStopPropagation) {
        e.stopPropagation()
      }
    }
  }

  private openMenu = e => {
    const { menu } = this.props
    const { menuOpen } = this.state
    if (menu && !menuOpen) {
      this.setState({ menuOpen: true })
      _.invoke(this.props, 'onActiveChanged', e, { ...this.props, active: true })
      e.stopPropagation()
      e.preventDefault()
    }
  }
}

MenuItem.create = createShorthandFactory(MenuItem, 'content')

export default MenuItem
