import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import menuItemRules from './menuItemRules'
import menuVariables from './menuVariables'
import { MenuItemBehavior } from '../../lib/accessibility'

class MenuItem extends UIComponent<any, any> {
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
  ]

  setAccessibility = acc => (this.currentAccessibility = acc)
  setElementRef = ref => (this.elementRef = ref)

  componentDidMount() {
    if (this.accEventHandlers.length) {
      this.attachEventHandler(this.accEventHandlers)
    } else {
      this.getAndAttachEventHandlers()
    }
  }

  componentWillUnmount() {
    if (this.accEventHandlers.length) {
      this.detachEventHandler(this.accEventHandlers)
    }
  }

  actions = {
    moveLeft: this.onArrowLeft,
    moveUp: this.onArrowUp,
    moveRight: this.onArrowRight,
    moveDown: this.onArrowDown,
    triggerClick: this.triggerClick,
    moveFisrst: this.onHome,
    moveLast: this.onEnd,
    closeSubmenu: this.onEsc,
  }

  onArrowLeft(event: Event) {
    console.log(event, 'on arrow left')
  }

  onArrowUp(event: Event) {
    console.log(event, 'on arrow up')
  }

  onArrowRight(event: Event) {
    console.log(event, 'on arrow right')
  }

  onArrowDown(event: Event) {
    console.log(event, 'on arrow right')
  }

  onEsc(event: Event) {
    console.log(event, 'on arrow Esc')
  }

  triggerClick(event: Event) {
    console.log(event, 'on space, enter, or click')
  }

  onHome(event: Event) {
    console.log(event, 'on Home')
  }

  onEnd(event: Event) {
    console.log(event, 'on End')
  }

  handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, content } = this.props

    this.setAccessibility(accessibility)

    return (
      <ElementType
        className={classes.root}
        onClick={this.handleClick}
        {...accessibility.attributes.anchor}
        {...rest}
        ref={this.setElementRef}
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
