import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { ReactElement } from 'react'

import { childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'

import { MenuBehavior } from '../../lib/accessibility/Behaviors/behaviors'
import menuVariables from './menuVariables'
import { IFocusAreaState, focusableIndexProperty } from '../../lib/focus/interfaces'
import FocusArea from '../../lib/focus/FocusArea'

interface MenuState extends IFocusAreaState {
  activeIndex: number
}

class Menu extends FocusArea<any, MenuState> {
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
  ]

  static autoControlledProps = ['activeIndex']

  static rules = menuRules

  static Item = MenuItem

  constructor(p, s) {
    super(p, s)
    this.accBehavior = new MenuBehavior()
  }

  getInitialAutoControlledState({ activeIndex }) {
    return { [focusableIndexProperty]: activeIndex || 0 }
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
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          type,
          shape,
          index,
          active: activeIndex === index,
          ...this.getFocusItemProps(index),
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, items } = this.props
    this.childrenCount = childrenExist(children) ? React.Children.count(children) : items.lenght
    return (
      <ElementType
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...this.accBehavior.generateKeyHandlers(this, this.props, this.state)}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? this.renderFocusItems(children) : this.renderItems()}
      </ElementType>
    )
  }
}

export default Menu
