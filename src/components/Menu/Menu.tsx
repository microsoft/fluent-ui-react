import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'

import { MenuBehavior } from '../../lib/accessibility/Behaviors/behaviors'
import menuVariables from './menuVariables'

class Menu extends AutoControlledComponent<any, any> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static variables = menuVariables

  static create: Function

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Index of the currently active item. */
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Index of the currently focusable item. */
    focusableIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Initial focusableIndex value. */
    defaultFocusableIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),
  }

  static defaultProps = {
    as: 'ul',
  }

  static handledProps = [
    'activeIndex',
    'focusableIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'defaultFocusableIndex',
    'items',
    'shape',
    'type',
  ]

  static autoControlledProps = ['activeIndex', 'focusableIndex']

  static rules = menuRules

  static Item = MenuItem

  constructor(p, s) {
    super(p, s)
    this.accBehavior = new MenuBehavior()
    this.registerAction('setFocusableChild', params => {
      const { index } = params
      console.error(index)
      if (index < 0 || index >= p.items.length) {
        return false
      }
      this.setState({ focusableIndex: index })

      return true
    })
  }

  getInitialAutoControlledState({ activeIndex }) {
    return { focusableIndex: activeIndex || 0 }
  }

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index, focusableIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = () => {
    const { items, type, shape } = this.props
    const { activeIndex, focusableIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          type,
          shape,
          index,
          active: parseInt(activeIndex, 10) === index,
          focusable: parseInt(focusableIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children } = this.props
    return (
      <ElementType
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...this.accBehavior.generateKeyHandlers(this, this.props, this.state)} // TODO: this only works for shorthand
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }
}

export default Menu
