import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import Icon from '../Icon'
import { MenuItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ItemShorthand,
  ReactChildren,
} from '../../../types/utils'

export interface IMenuItemProps {
  accessibility?: Accessibility
  active?: boolean
  as?: any
  children?: ReactChildren
  className?: string
  content?: any
  icon?: ItemShorthand
  iconOnly?: boolean
  index?: number
  onClick?: ComponentEventHandler<IMenuItemProps>
  pills?: boolean
  pointing?: boolean
  type?: 'primary' | 'secondary'
  underlined?: boolean
  vertical?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class MenuItem extends UIComponent<Extendable<IMenuItemProps>, any> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static create: Function

  static propTypes = {
    /** A menu item can be active. */
    active: PropTypes.bool,

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

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

    /** A menu can point to show its relationship to nearby content. */
    pointing: PropTypes.bool,

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** Menu items can by highlighted using underline. */
    underlined: PropTypes.bool,

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'li',
    accessibility: MenuItemBehavior as Accessibility,
  }

  static handledProps = [
    'accessibility',
    'active',
    'as',
    'children',
    'className',
    'content',
    'icon',
    'iconOnly',
    'index',
    'onClick',
    'pills',
    'pointing',
    'styles',
    'type',
    'underlined',
    'variables',
    'vertical',
  ]

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, content, icon } = this.props

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...rest}>
        {childrenExist(children) ? (
          children
        ) : (
          <a
            className={cx('ui-menu__item__anchor', classes.anchor)}
            onClick={this.handleClick}
            {...accessibility.attributes.anchor}
          >
            {icon &&
              Icon.create(this.props.icon, {
                defaultProps: { xSpacing: !!content ? 'after' : 'none' },
              })}
            {content}
          </a>
        )}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
