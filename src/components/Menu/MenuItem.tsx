import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  AutoControlledComponent,
  customPropTypes,
  doesNodeContainClick,
} from '../../lib'

import Icon from '../Icon'
import Menu from './Menu'
import { MenuItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActions } from '../../lib/accessibility/interfaces'
import { focusFirstChild } from '@uifabric/utilities'

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

    submenu: PropTypes.object,
    submenuOpened: PropTypes.bool,
    defaultSubmenuOpened: PropTypes.bool,
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
  ]

  static autoControlledProps = ['submenuOpened']

  getInitialAutoControlledState() {
    return { submenuOpened: false }
  }

  submenuComponent: Menu
  setSubmenuRef = ref => (this.submenuComponent = ref)

  actions: AccessibilityActions = {
    openSubmenuAndFocusFirst: () => this.openSubmenu(() => this.submenuComponent.focusFirstItem()),
    openSubmenuAndFocusLast: () => this.openSubmenu(() => this.submenuComponent.focusLastItem()),
    closeSubmenuAndFocusCurrent: () => this.closeSubmenu(() => focusFirstChild(this.elementRef)),
    closeSubmenuAndFocusSibling: () => this.closeSubmenu(),
    triggerClick: event => this.handleClick(event),
  }

  componentDidMount() {
    document && document.addEventListener('click', this.documentEventHandler)
  }

  componentWillUnmount() {
    document && document.removeEventListener('click', this.documentEventHandler)
  }

  openSubmenu = (afterRenderClbk?: () => void) => {
    if (!this.props.submenu) return
    this.setState({ submenuOpened: true }, afterRenderClbk)
  }

  closeSubmenu = (afterRenderClbk?: () => void) => {
    if (!this.props.submenu || !this.state.submenuOpened) return
    this.setState({ submenuOpened: false }, afterRenderClbk)
  }

  documentEventHandler = (event: Event) => {
    event.stopPropagation()
    if (this.elementRef && doesNodeContainClick(this.elementRef, event)) return
    this.closeSubmenu()
  }

  handleClick = event => {
    if (this.props.submenu) {
      this.setState({ submenuOpened: !this.state.submenuOpened })
    } else {
      alert(this.props.content)
    }

    event.stopPropagation()

    _.invoke(this.props, 'onClick', event, this.props)
  }

  renderSubmenu() {
    const submenu = this.props.submenu
    submenu.ref = ref => this.setSubmenuRef(ref)

    return Menu.create(submenu)
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
        {this.state.submenuOpened && this.renderSubmenu()}
      </ElementType>
    )
  }
}

MenuItem.create = createShorthandFactory(MenuItem, {})

export default MenuItem
