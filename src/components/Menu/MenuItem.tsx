import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import Icon from '../Icon'
import Menu from '../Menu'
import Popup from '../Popup'
import { menuItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import IsFromKeyboard from '../../lib/isFromKeyboard'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ReactChildren,
  ShorthandRenderFunction,
  ShorthandValue,
} from '../../../types/utils'

export interface IMenuItemProps {
  accessibility?: Accessibility
  active?: boolean
  as?: any
  children?: ReactChildren
  className?: string
  content?: any
  disabled?: boolean
  icon?: ShorthandValue
  iconOnly?: boolean
  index?: number
  menu?: any
  onClick?: ComponentEventHandler<IMenuItemProps>
  pills?: boolean
  pointing?: boolean | 'start' | 'end'
  renderIcon?: ShorthandRenderFunction
  type?: 'primary' | 'secondary'
  underlined?: boolean
  vertical?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

export interface IMenuItemState {
  [IsFromKeyboard.propertyName]: boolean
}

class MenuItem extends UIComponent<Extendable<IMenuItemProps>, IMenuItemState> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static create: Function

  static propTypes = {
    /** A menu item can be active. */
    active: PropTypes.bool,

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** A menu item can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** Name or shorthand for Menu Item Icon */
    icon: customPropTypes.itemShorthand,

    /** A menu may have just icons. */
    iconOnly: PropTypes.bool,

    /** MenuItem index inside Menu. */
    index: PropTypes.number,

    /** MenuItem's submenu */
    menu: PropTypes.any,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A menu can adjust its appearance to de-emphasize its contents. */
    pills: PropTypes.bool,

    /**
     * A menu can point to show its relationship to nearby content.
     * For vertical menu, it can point to the start of the item or to the end.
     */
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** Menu items can by highlighted using underline. */
    underlined: PropTypes.bool,

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,

    /**
     * A custom render function the icon slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderIcon: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'li',
    accessibility: menuItemBehavior as Accessibility,
  }

  state = IsFromKeyboard.initial

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { activeIndex, children, index, menu, popupOpen, vertical, type } = this.props

    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
      >
        {childrenExist(children) ? (
          children
        ) : !menu ? (
          this.renderMenuItem(accessibility, classes)
        ) : (
          <Popup
            open={index === activeIndex ? popupOpen : false}
            align={vertical ? 'top' : 'start'}
            position={vertical ? 'after' : 'below'}
            content={{
              content: <Menu items={menu.items} vertical type={type} />,
              styles: {
                padding: '0px',
                border: '',
              },
            }}
            // content={<Menu items={menu.items} type={type} vertical/>}
          >
            {this.renderMenuItem(accessibility, classes)}
          </Popup>
        )}
      </ElementType>
    )
  }
  private renderMenuItem = (accessibility, classes) => {
    const { content, icon, renderIcon } = this.props
    return (
      <a
        className={cx('ui-menu__item__anchor', classes.anchor)}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...accessibility.attributes.anchor}
        {...accessibility.keyHandlers.anchor}
      >
        {icon &&
          Icon.create(this.props.icon, {
            defaultProps: { xSpacing: !!content ? 'after' : 'none' },
            render: renderIcon,
          })}
        {content}
      </a>
    )
  }
  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }

  private handleClick = e => {
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
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
