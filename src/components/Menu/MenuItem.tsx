import _ from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { MenuItemBehavior } from '../../lib/accessibility/Behaviors/behaviors'

import menuItemRules from './menuItemRules'
import menuVariables from './menuVariables'
import ClickAction from '../actions/ClickAction'
import FocusGrab from '../../lib/accessibility/FocusGrab'

class MenuItem extends UIComponent<any, any> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static variables = menuVariables

  static create: Function

  static rules = menuItemRules

  static propTypes = {
    /** A menu item can be active. */
    active: PropTypes.bool,

    /** A menu item can be focusable. */
    focusable: PropTypes.bool,

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
  }

  static defaultProps = {
    as: 'li',
  }

  static handledProps = [
    'active',
    'focusable',
    'as',
    'children',
    'className',
    'content',
    'index',
    'onClick',
    'pointing',
    'shape',
    'type',
  ]

  private elementRef: HTMLElement

  onClickActionHandler = ClickAction.handler(() => {
    FocusGrab.focusWithin(this.elementRef)
    this.handleClick(undefined)
    return true
  })

  constructor(p, s) {
    super(p, s)
    this.accBehavior = new MenuItemBehavior()

    this.registerActionHandler(this.onClickActionHandler)
  }

  componentDidUpdate(prevProps: any) {
    if (this.elementRef && FocusGrab.tokenShouldGrabFocus(this.props[FocusGrab.tokenProperty])) {
      this.elementRef.focus()
    }
  }

  componentDidMount() {
    if (FocusGrab.elementShouldGrabFocus(this.elementRef)) {
      this.elementRef.focus()
    }
  }

  setElementRef = (elementRef: HTMLElement) => {
    this.elementRef = elementRef
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content } = this.props

    return (
      <ElementType role="presentation">
        <div // this is an attempt to mimic the acc prototype
          {...rest}
          className={classes.root}
          onClick={this.handleClick}
          {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
          {...this.accBehavior.generateKeyHandlers(this, this.props, this.state)} // TODO: this only works for shorthand
          ref={this.setElementRef} // TODO: can/should we add ref only to focusable elements?
        >
          {childrenExist(children) ? (
            children
          ) : (
            // this is an attempt to mimic the prototype
            <span>{content}</span>
            // <a className={cx('ui-menu__item__anchor', classes.anchor)}>{content}</a>
          )}
        </div>

        {this.props.submenu}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
