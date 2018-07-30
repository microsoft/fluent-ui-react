import _ from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  AutoControlledComponent,
} from '../../lib'
import { MenuItemBehavior } from '../../lib/accessibility/Behaviors/behaviors'

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

class MenuItem extends AutoControlledComponent<any, MenuItemState> {
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

    /** A menu can point to show its relationship to nearby content. */
    pointing: PropTypes.bool,

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    submenu: PropTypes.node,

    submenuOpened: PropTypes.bool,

    defaultSubmenuOpened: PropTypes.bool,
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
    'pointing',
    'shape',
    'type',
    'submenu',
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

  constructor(p, context) {
    super(p, context)
    this.accBehavior = new MenuItemBehavior()

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
