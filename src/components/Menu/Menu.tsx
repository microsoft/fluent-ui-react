import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { AutoControlledComponent, childrenExist, customPropTypes } from '../../lib'
import MenuItem from './MenuItem'
import menuRules from './menuRules'
import menuVariables from './menuVariables'
import { MenuBehavior } from '../../lib/accessibility'

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

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial activeIndex value. */
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

    shape: PropTypes.oneOf(['pills', 'pointing', 'underlined']),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'ul',
    accessibility: MenuBehavior,
  }

  static handledProps = [
    'accessibility',
    'activeIndex',
    'as',
    'children',
    'className',
    'defaultActiveIndex',
    'items',
    'shape',
    'type',
    'vertical',
  ]

  componentDidMount() {
    // if (this.currentAccessibility) {
    //   this.currentAccessibility.actions['moveNext'] = () => {
    //     console.log('move next')
    //   }
    // }
    this.attachKeyboardEventHandlers()
  }

  componentWillUnmount() {
    this.detachKeyboardEventHandlers()
  }

  static autoControlledProps = ['activeIndex']

  static rules = menuRules

  static Item = MenuItem

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
          active: parseInt(activeIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    this.setAccessibility(accessibility)

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rest}
        className={classes.root}
        ref={this.setElementRef}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }
}

export default Menu
