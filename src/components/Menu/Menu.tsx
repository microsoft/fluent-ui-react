import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { ReactElement } from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'

import { A11yBehaviorType, A11yBehaviorFactory } from '../../lib/accessibility/A11yBehaviorFactory'
import menuVariables from './menuVariables'
import { FocusZone } from '../FocusZone'

interface MenuState {
  activeIndex: number
}

class Menu extends AutoControlledComponent<any, MenuState> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static variables = menuVariables

  static create: Function

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

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    grabFocus: PropTypes.bool,

    componentRef: PropTypes.object,

    a11yType: PropTypes.string,
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = [
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'items',
    'shape',
    'type',
    'grabFocus',
    'a11yType',
  ]

  static autoControlledProps = ['activeIndex']

  static rules = menuRules

  static Item = MenuItem

  focusGrabbed = false

  focusZone: FocusZone
  setFocusZone = fz => (this.focusZone = fz)

  constructor(props, state) {
    super(props, state)
    const a11yType: string = props.a11yType
    this.accBehavior = A11yBehaviorFactory.createBehavior(
      A11yBehaviorType[a11yType] || A11yBehaviorType.menu,
    )
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
    const { items, type, shape } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          type,
          shape,
          index,
          active: activeIndex === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children } = this.props
    return (
      <FocusZone
        elementType={ElementType}
        preventDefaultWhenHandled={true}
        ref={this.setFocusZone}
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </FocusZone>
    )
  }
}

export default Menu
