import _ from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { MenuType, MenuShape } from './Menu'

import menuItemRules from './menuItemRules'
import menuVariables from './menuVariables'
import { AccessibilityType } from '../../lib/accessibility/AccessibilityFactory'

export interface IMenuItemProps {
  active?: boolean
  as?: string
  children?: ReactNode
  className?: string
  content?: ReactNode
  index?: number
  onClick?: (any, IMenuItemProps) => void
  shape?: MenuShape
  type?: MenuType
  vertical?: boolean
}

class MenuItem extends UIComponent<IMenuItemProps, any> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static variables = menuVariables

  static create: Function

  static rules = menuItemRules

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

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.string,
  }

  static defaultProps = {
    as: 'li',
    accessibility: AccessibilityType[AccessibilityType.menuItem],
  }

  static handledProps = [
    'accessibility',
    'active',
    'as',
    'children',
    'className',
    'content',
    'index',
    'onClick',
    'shape',
    'type',
    'vertical',
  ]

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, rest, accessibility }) {
    const { children, content } = this.props

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rest}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <a
            className={cx('ui-menu__item__anchor', classes.anchor)}
            {...accessibility.attributes.anchor}
          >
            {content}
          </a>
        )}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
