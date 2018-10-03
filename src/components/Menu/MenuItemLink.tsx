import * as PropTypes from 'prop-types'
import * as _ from 'lodash'

import { /*childrenExist,*/ createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { MenuItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import Icon from '../Icon/Icon'
import * as React from 'react'
import {
  ComponentEventHandler,
  Extendable,
  ItemShorthand,
  ReactChildren,
} from '../../../types/utils'
import { ComponentPartStyle, ComponentVariablesInput } from '../../../types/theme'
import IsFromKeyboard from '../../lib/isFromKeyboard'

export interface IMenuItemLinkProps {
  accessibility?: Accessibility
  active?: boolean
  as?: any
  children?: ReactChildren
  className?: string
  content?: any
  disabled?: boolean
  icon?: ItemShorthand
  iconOnly?: boolean
  index?: number
  onClick?: ComponentEventHandler<IMenuItemLinkProps>
  pills?: boolean
  pointing?: boolean | 'start' | 'end'
  type?: 'primary' | 'secondary'
  underlined?: boolean
  vertical?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
  [IsFromKeyboard.propertyName]: boolean
}

class MenuItemLink extends UIComponent<Extendable<IMenuItemLinkProps>, {}> {
  static displayName = 'MenuItemLink'

  static className = 'ui-menu__itemlink'

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
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    isFromKeyboard: PropTypes.bool,
  }

  static defaultProps = {
    as: 'a',
    accessibility: MenuItemBehavior as Accessibility,
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onBlur', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onFocus', e, this.props)
  }

  public renderComponent({ ElementType, classes, accessibility, rest }) {
    const { content, icon } = this.props

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...accessibility.attributes.anchor} // FIXME: separate behavior?
        {...accessibility.keyHandlers.anchor}
        {...rest}
      >
        {icon &&
          Icon.create(this.props.icon, {
            defaultProps: { xSpacing: !!content ? 'after' : 'none' },
          })}
        {content} {/*FIXME: support children*/}
      </ElementType>
    )
  }
}

MenuItemLink.create = createShorthandFactory(MenuItemLink, content => ({ content }))

export default MenuItemLink
