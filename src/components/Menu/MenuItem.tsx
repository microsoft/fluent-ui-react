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

import Icon from '../Icon'
import { MenuItemBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import MenuItemActionHandler from '../../lib/accessibility/Actions/Menu/MenuItemActionHandler'

interface MenuItemState {
  submenuOpened: boolean
}

class MenuItem extends AutoControlledComponent<any, MenuItemState> {
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

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),     

    submenu: PropTypes.node,
    submenuOpened: PropTypes.bool,
    defaultSubmenuOpened: PropTypes.bool,
    tabIndex: PropTypes.number,
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
    'shape',
    'styles',
    'type',
    'variables',
    'vertical',
    'submenu',
    'tabIndex',
  ]

  static autoControlledProps = ['submenuOpened']

  getInitialAutoControlledState() {
    return { submenuOpened: false }
  }

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
    this.actionHandler && this.actionHandler.detachKeyboardEventHandlers()
  }

  openSubmenu(event: KeyboardEvent, afterRenderClbk: (event?: KeyboardEvent) => void) {
    if (!this.props.submenu) {
      // trigger action on click
      this.handleClick(event)
    } else {
      this.setState({ submenuOpened: true }, () => afterRenderClbk && afterRenderClbk(event))
    }
  }

  closeSubmenu(event: KeyboardEvent, afterRenderClbk: (event?: KeyboardEvent) => void) {
    if (!this.props.submenu) return
    this.setState({ submenuOpened: false }, () => afterRenderClbk && afterRenderClbk(event))
  }

  toggleSubmenu() {
    this.setState({ submenuOpened: !this.state.submenuOpened })
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
    const { children, content, icon } = this.props

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
          children
        ) : (
          <a
            className={cx('ui-menu__item__anchor', classes.anchor)}
            {...accessibility.attributes.anchor}
          >
            {icon &&
              Icon.create(this.props.icon, {
                defaultProps: { xSpacing: !!content ? 'after' : 'none' },
              })}
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
