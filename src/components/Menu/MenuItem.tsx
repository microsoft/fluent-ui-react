import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as keyboardKey from 'keyboard-key'

import {
  AutoControlledComponent,
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  EventStack,
} from '../../lib'
import Icon from '../Icon/Icon'
import Menu, { MenuProps } from '../Menu/Menu'
import Slot from '../Slot/Slot'
import { menuItemBehavior, submenuBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import IsFromKeyboard from '../../lib/isFromKeyboard'
import { ComponentEventHandler, Extendable, ShorthandValue } from '../../../types/utils'
import { focusAsync } from '../../lib/accessibility/FocusZone'
import { Ref } from '@stardust-ui/react'

export interface MenuItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuItemBehavior
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

  /** Indicates if the submenu is open */
  submenuOpen?: boolean

  /** Default submenu open */
  defaultSubmenuOpen?: boolean
}

export interface MenuItemState {
  [IsFromKeyboard.propertyName]: boolean
  submenuOpen: boolean
}

/**
 * A menu item is an actionable navigation item within a menu.
 */
class MenuItem extends AutoControlledComponent<Extendable<MenuItemProps>, MenuItemState> {
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
    pills: PropTypes.bool,
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
    wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    menu: customPropTypes.itemShorthand,
    submenuOpen: PropTypes.bool,
    defaultSubmenuOpen: PropTypes.bool,
  }

  static defaultProps = {
    as: 'a',
    accessibility: menuItemBehavior as Accessibility,
    wrapper: { as: 'li' },
  }

  static autoControlledProps = ['submenuOpen']

  state = {
    ...IsFromKeyboard.initial,
    submenuOpen: false,
  }

  private outsideClickSubscription = EventStack.noSubscription

  private submenuDomElement = null
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

    const { submenuOpen } = this.state

    const menuItemInner = childrenExist(children) ? (
      children
    ) : (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...accessibility.attributes.anchor}
        {...accessibility.keyHandlers.anchor}
        {...rest}
        ref={this.itemRef}
      >
        {icon &&
          Icon.create(this.props.icon, {
            defaultProps: { xSpacing: !!content ? 'after' : 'none' },
          })}
        {content}
      </ElementType>
    )

    const maybeSubmenu =
      menu && active && submenuOpen
        ? Menu.create(menu, {
            defaultProps: {
              accessibility: submenuBehavior,
              vertical: true,
              primary,
              secondary,
              styles: styles.menu,
            },
            overrideProps: {
              onClick: this.handleSubmenuClicked,
              onKeyDown: this.handleSubmenuKeyDown,
            },
          })
        : null

    const maybeSubmenuWithRef = maybeSubmenu ? (
      <Ref
        innerRef={domElement => {
          this.submenuDomElement = domElement
        }}
      >
        {maybeSubmenu}
      </Ref>
    ) : null

    if (wrapper) {
      return Slot.create(wrapper, {
        defaultProps: {
          className: cx('ui-menu__item__wrapper', classes.wrapper),
          ...accessibility.attributes.wrapper,
          ...accessibility.keyHandlers.wrapper,
        },
        overrideProps: () => ({
          children: [menuItemInner, maybeSubmenuWithRef],
        }),
      })
    }
    return menuItemInner
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
    openSubmenu: event => this.openSubmenu(event),
    closeMenu: event => this.closeMenu(event),
    closeSubmenu: event => this.closeSubmenu(event),
  }

  private updateOutsideClickSubscription() {
    this.outsideClickSubscription.unsubscribe()

    if (this.props.menu && this.state.submenuOpen) {
      setTimeout(() => {
        this.outsideClickSubscription = EventStack.subscribe('click', e => {
          if (
            this.itemRef &&
            (!this.itemRef.current || !this.itemRef.current.contains(e.target)) &&
            (!this.submenuDomElement || !this.submenuDomElement.contains(e.target))
          ) {
            this.state.submenuOpen && this.trySetState({ submenuOpen: false })
          }
        })
      })
    }
  }

  private handleClick = e => {
    const { active, menu } = this.props
    if (menu) {
      this.trySetState({ submenuOpen: active ? !this.state.submenuOpen : true })
      e.stopPropagation()
    }
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    this.setState(IsFromKeyboard.initial)

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState(IsFromKeyboard.state())

    _.invoke(this.props, 'onFocus', e, this.props)
  }

  private closeMenu = e => {
    const { menu } = this.props
    const { submenuOpen } = this.state
    if (menu && submenuOpen) {
      this.setState({ submenuOpen: false }, () => focusAsync(this.itemRef.current))
    }
  }

  private closeSubmenu = e => {
    const { menu } = this.props
    const { submenuOpen } = this.state
    if (menu && submenuOpen) {
      this.setState({ submenuOpen: false }, () => focusAsync(this.itemRef.current))
      e.stopPropagation()
    }
  }

  private openSubmenu = e => {
    const { menu } = this.props
    const { submenuOpen } = this.state
    if (menu && !submenuOpen) {
      this.handleClick(e)
      e.stopPropagation()
      e.preventDefault()
    }
  }

  private handleSubmenuClicked = (e: React.SyntheticEvent, props: MenuProps) => {
    this.trySetState({ submenuOpen: false })
    _.invoke(props, 'onClick', props)
  }

  private handleSubmenuKeyDown = (e: React.SyntheticEvent, props: MenuProps) => {
    if (
      keyboardKey.getCode(e) === keyboardKey.Enter ||
      keyboardKey.getCode(e) === keyboardKey.Spacebar
    ) {
      this.trySetState({ submenuOpen: false })
    }
    _.invoke(props, 'onKeyDown', props)
  }
}

MenuItem.create = createShorthandFactory(MenuItem, 'content')

export default MenuItem
