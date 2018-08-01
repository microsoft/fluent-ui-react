import _ from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  AutoControlledComponent,
} from '../../lib'
import { AccBehaviorType, AccBehaviorFactory } from '../../lib/accessibility/AccBehaviorFactory'

import { MenuType, MenuShape } from './Menu'

import menuItemRules from './menuItemRules'
import menuVariables from './menuVariables'
import ClickAction from '../../lib/actions/ClickAction'
import MenuCloseSubmenuAction, {
  MenuCloseSubmenuActionParams,
} from '../../lib/actions/MenuCloseSubmenuAction'
import { focusFirstChild } from '../../lib/fabric'

interface MenuItemState {
  submenuOpened: boolean
}

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
  submenu?: ReactNode
  submenuOpened?: boolean
  defaultSubmenuOpened?: boolean
  accBehavior?: string
}

class MenuItem extends AutoControlledComponent<IMenuItemProps, MenuItemState> {
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

    submenu: PropTypes.node,

    submenuOpened: PropTypes.bool,

    defaultSubmenuOpened: PropTypes.bool,

    accBehavior: PropTypes.string,
  }

  static defaultProps = {
    as: 'li',
  }

  static handledProps = [
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
    'submenu',
    'accBehavior',
  ]

  static autoControlledProps = ['submenuOpened']

  elementRef: HTMLElement
  setElementRef = ref => (this.elementRef = ref)

  clickHandler = ClickAction.handler(() => {
    this.handleClick(undefined)
  })

  closeSubmenuHandler = MenuCloseSubmenuAction.handler((params: MenuCloseSubmenuActionParams) => {
    if (this.props['submenu'] && this.state['submenuOpened']) {
      this.setState({ submenuOpened: false })
      if (params.moveFocus) {
        focusFirstChild(this.elementRef)
      }
    }
  })

  onEscActionHandler = undefined // TODO: if has submenu and submenu is open, close it and make parent focusable

  constructor(props, state) {
    super(props, state)
    const accBehavior: string = props.accBehavior
    this.accBehavior = AccBehaviorFactory.getBehavior(
      AccBehaviorType[accBehavior] || AccBehaviorType.menuItem,
    )

    this.registerActionHandler(this.clickHandler)
    this.registerActionHandler(this.closeSubmenuHandler)
  }

  getInitialAutoControlledState() {
    return { submenuOpened: false }
  }

  handleClick = e => {
    if (this.props.submenu) {
      this.setState({ submenuOpened: !this.state.submenuOpened })
    }
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    const submenuIndicator = this.props.submenu && (this.state.submenuOpened ? '<' : '>')
    return (
      <ElementType
        ref={this.setElementRef}
        role="presentation"
        onKeyDown={this.accBehavior.onKeyDown(this, this.props, this.state)}
      >
        <div // this is an attempt to mimic the acc prototype
          {...rest}
          className={classes.root}
          onClick={this.handleClick}
          {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        >
          {childrenExist(children) ? (
            children
          ) : (
            // this is an attempt to mimic the prototype
            <span>{content}</span>
            // <a className={cx('ui-menu__item__anchor', classes.anchor)}>{content}</a>
          )}
          {submenuIndicator}
        </div>

        {this.state.submenuOpened && this.props.submenu}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
