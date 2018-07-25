import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { ReactElement } from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'

import { MenuBehavior } from '../../lib/accessibility/Behaviors/behaviors'
import menuVariables from './menuVariables'
import SetFocusableChild, { FocusableIndexState } from '../actions/SetFocusableChild'
import FocusGrab from '../../lib/accessibility/FocusGrab'

interface MenuState extends FocusableIndexState {
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

  private childrenCount: number

  constructor(p, s) {
    super(p, s)
    this.accBehavior = new MenuBehavior()
    this.registerActionHandler(
      SetFocusableChild.handler(params =>
        SetFocusableChild.updateState(params, this.childrenCount, this.setState.bind(this)),
      ),
    )
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
          active: activeIndex === index,
          focusable: focusableIndex === index,
          [FocusGrab.tokenProperty]:
            focusableIndex === index && this.state[FocusGrab.tokenProperty],
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
        {...this.accBehavior.generateKeyHandlers(this, this.props, this.state)} // TODO: this only works for shorthand
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? this.renderChildren(children) : this.renderItems()}
      </ElementType>
    )
  }

  renderChildren(children) {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child as ReactElement<any>, {
        index,
        focusable: this.state.focusableIndex === index,
        [FocusGrab.tokenProperty]:
          this.state.focusableIndex === index && this.state[FocusGrab.tokenProperty],
      })
    })
  }
}

export default Menu
