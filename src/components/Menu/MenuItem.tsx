import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  AutoControlledComponent,
  customPropTypes,
} from '../../lib'
import menuItemRules from './menuItemRules'
import menuVariables from './menuVariables'
import { MenuItemBehavior } from '../../lib/accessibility'
import MenuItemActionHandler from '../../lib/accessibility/Actions/Menu/MenuItemActionHandler'

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

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    submenu: PropTypes.node,
    submenuOpened: PropTypes.bool,
    defaultSubmenuOpened: PropTypes.bool,
    tabIndex: PropTypes.number,
  }

  static defaultProps = {
    as: 'li',
    accessibility: MenuItemBehavior,
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
    'submenu',
    'tabIndex',
  ]

  static autoControlledProps = ['submenuOpened']

  getInitialAutoControlledState() {
    return { submenuOpened: false }
  }

  actionHandler: MenuItemActionHandler

  constructor(p, s) {
    super(p, s)
  }

  componentDidMount() {
    this.actionHandler = new MenuItemActionHandler(
      {
        ...this.props,
        ...this.state,
        ...this.currentAccessibility,
      },
      this.elementRef,
      this.openSubmenu.bind(this),
      this.closeSubmenu.bind(this),
    )

    this.actionHandler.attachKeyboardEventHandlers()
  }

  componentWillUnmount() {
    this.actionHandler.detachKeyboardEventHandlers()
  }

  openSubmenu() {
    if (!this.props.submenu) {
      alert(this.props.content)
    }

    if (!this.state.submenuOpened) {
      this.setState({ submenuOpened: true })
    }
  }

  closeSubmenu() {
    if (!this.props.submenu || !this.state.submenuOpened) return
    this.setState({ submenuOpened: false }, () => {
      this.focus()
    })
  }

  toggleSubmenu() {
    this.setState({ submenuOpened: !this.state.submenuOpened })
  }

  focus() {
    this.elementRef.focus()
  }

  handleClick = e => {
    if (this.props.submenu) {
      this.toggleSubmenu()
    } else {
      alert(this.props.content)
    }

    e.stopPropagation()

    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, content } = this.props

    this.setAccessibility(accessibility)

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        ref={this.setElementRef}
        {...rest}
      >
        {childrenExist(children) ? (
          <div
            className={classes.div}
            tabIndex={this.props.tabIndex}
            {...accessibility.attributes.anchor}
          >
            {children}
          </div>
        ) : (
          <a
            className={cx('ui-menu__item__anchor', classes.anchor)}
            {...accessibility.attributes.anchor}
          >
            {content}
          </a>
        )}
        {this.state.submenuOpened && this.props.submenu}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
