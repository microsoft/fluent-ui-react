import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  AutoControlledComponent,
} from '../../lib'
import Icon from '../Icon/Icon'
import Menu from '../Menu/Menu'
import Slot from '../Slot/Slot'
import { menuItemBehavior, submenuBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import IsFromKeyboard from '../../lib/isFromKeyboard'

import {
  ComponentEventHandler,
  Extendable,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib/commonPropInterfaces'
import {
  commonUIComponentPropTypes,
  childrenComponentPropTypes,
  contentComponentPropsTypes,
} from '../../lib/commonPropTypes'
import { focusAsync } from 'src/lib/accessibility/FocusZone'

export interface MenuItemProps
  extends UIComponentProps<any, any>,
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

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /**
   * A custom render function the wrapper slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderWrapper?: ShorthandRenderFunction

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
    ...commonUIComponentPropTypes,
    ...childrenComponentPropTypes,
    ...contentComponentPropsTypes,
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
    renderIcon: PropTypes.func,
    wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    renderWrapper: PropTypes.func,
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

  private itemRef = React.createRef<HTMLElement>()

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const {
      children,
      content,
      icon,
      renderIcon,
      renderWrapper,
      wrapper,
      menu,
      type,
      vertical,
      active,
    } = this.props

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
            render: renderIcon,
          })}
        {content}
      </ElementType>
    )

    const maybeSubmenu =
      menu && active && submenuOpen
        ? Menu.create(menu, {
            overrideProps: {
              accessibility: submenuBehavior,
              vertical: true,
              type,
              styles: {
                // background: 'white',
                // zIndex: '1000',
                position: 'absolute',
                top: vertical ? '0' : '100%',
                left: vertical ? '100%' : '0',
              },
            },
          })
        : null

    if (wrapper) {
      return Slot.create(wrapper, {
        defaultProps: {
          className: cx('ui-menu__item__wrapper', classes.wrapper),
          ...accessibility.attributes.wrapper,
          ...accessibility.keyHandlers.wrapper,
        },
        render: renderWrapper,
        overrideProps: () => ({
          children: [menuItemInner, menu ? '>' : undefined, maybeSubmenu],
        }),
      })
    }
    return menuItemInner
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
    closeMenu: event => this.closeMenu(event),
    closeSubmenu: event => this.closeSubmenu(event),
  }

  private handleClick = e => {
    const { active, menu } = this.props
    if (menu) {
      this.setState({ submenuOpen: active ? !this.state.submenuOpen : true })
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
}

MenuItem.create = createShorthandFactory(MenuItem, 'content')

export default MenuItem
