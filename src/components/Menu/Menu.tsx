import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import { MenuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { FocusZone, FocusZoneDirection } from '../FocusZone'
import MenuItem from './MenuItem'

class Menu extends AutoControlledComponent<any, any> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static create: Function

  private navDirection: FocusZoneDirection

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** A vertical menu may take the size of its container. */
    fluid: PropTypes.bool,

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    grabFocus: PropTypes.bool,

    componentRef: PropTypes.object,

    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: MenuBehavior as Accessibility,
  }

  static handledProps = [
    'accessibility',
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'fluid',
    'items',
    'shape',
    'type',
    'vertical',
    'grabFocus',
    'onKeyDown',
  ]

  static autoControlledProps = ['activeIndex']

  static Item = MenuItem

  focusGrabbed = false

  focusZone: FocusZone
  setFocusZone = fz => (this.focusZone = fz)

  constructor(props, state) {
    super(props, state)
    this.navDirection = this.props.vertical
      ? FocusZoneDirection.vertical
      : FocusZoneDirection.horizontal
  }

  componentDidMount() {
    this.grabFocusIfNeeded()
  }

  componentDidUpdate() {
    this.grabFocusIfNeeded()
  }

  grabFocusIfNeeded() {
    if (this.props.grabFocus && !this.focusGrabbed && this.focusZone) {
      this.focusGrabbed = true
      this.focusZone.focus()
    }
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = () => {
    const { items, type, shape, vertical } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          type,
          shape,
          vertical,
          index,
          active: activeIndex === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <FocusZone
        direction={this.navDirection}
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        isCircularNavigation={true}
        ref={this.setFocusZone}
        {...accessibility.attributes.root}
        {...rest}
        className={classes.root}
        onKeyDown={this.props.onKeyDown}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </FocusZone>
    )
  }
}

export default Menu
