import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  customPropTypes,
  createShorthandFactory,
} from '../../lib'
import MenuItem from './MenuItem'
import { MenuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesObject } from '../../../types/theme'
import { focusFirstChild, focusAsync, getLastFocusable } from '@uifabric/utilities'

class Menu extends AutoControlledComponent<any, any> {
  static displayName = 'Menu'

  static className = 'ui-menu'

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

    /** A vertical menu may take the size of its container. */
    fluid: PropTypes.bool,

    /** A menu may have just icons. */
    iconOnly: PropTypes.bool,

    /** Shorthand array of props for Menu. */
    items: customPropTypes.collectionShorthand,

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
    'iconOnly',
    'items',
    'shape',
    'styles',
    'type',
    'variables',
    'vertical',
  ]

  static autoControlledProps = ['activeIndex']

  static Item = MenuItem

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
  })

  renderItems = (variables: ComponentVariablesObject) => {
    const { iconOnly, items, type, shape, vertical } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          iconOnly,
          type,
          shape,
          variables,
          vertical,
          index,
          active: parseInt(activeIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  focusFirstItem = () => {
    focusFirstChild(this.elementRef)
  }

  focusLastItem = () => {
    const lastFocusableElement = getLastFocusable(this.elementRef, this.elementRef
      .lastElementChild as HTMLElement)
    lastFocusableElement && focusAsync(lastFocusableElement)
  }

  renderComponent({ ElementType, classes, accessibility, variables, rest }) {
    const { children } = this.props

    this.setAccessibility(accessibility)

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rest}
        className={classes.root}
        ref={this.setElementRef}
      >
        {childrenExist(children) ? children : this.renderItems(variables)}
      </ElementType>
    )
  }
}

Menu.create = createShorthandFactory(Menu, content => ({ content }))

export default Menu
