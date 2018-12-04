import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  customPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import MenuItem from './MenuItem'
import { menuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import { ComponentVariablesObject } from '../../themes/types'
import { Extendable, ShorthandValue } from '../../../types/utils'

export interface MenuProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuBehavior
   * */
  accessibility?: Accessibility

  /** Index of the currently active item. */
  activeIndex?: number | string

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | string

  /** A vertical menu may take the size of its container. */
  fluid?: boolean

  /** A menu may have just icons. */
  iconOnly?: boolean

  /** Shorthand array of props for Menu. */
  items?: ShorthandValue[]

  /** A menu can adjust its appearance to de-emphasize its contents. */
  pills?: boolean

  /**
   * A menu can point to show its relationship to nearby content.
   * For vertical menu, it can point to the start of the item or to the end.
   */
  pointing?: boolean | 'start' | 'end'

  /** The menu can have primary type. */
  primary?: boolean

  /** The menu can have secondary type. */
  secondary?: boolean

  /** Menu items can by highlighted using underline. */
  underlined?: boolean

  /** A vertical menu displays elements vertically. */
  vertical?: boolean
}

/**
 * A menu displays grouped navigation actions.
 */
class Menu extends AutoControlledComponent<Extendable<MenuProps>, any> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.func,
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fluid: PropTypes.bool,
    iconOnly: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    pills: PropTypes.bool,
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: menuBehavior as Accessibility,
  }

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
    const {
      iconOnly,
      items,
      pills,
      pointing,
      primary,
      secondary,
      underlined,
      vertical,
    } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) =>
      MenuItem.create(item, {
        defaultProps: {
          iconOnly,
          pills,
          pointing,
          primary,
          secondary,
          underlined,
          variables,
          vertical,
          index,
          active: parseInt(activeIndex, 10) === index,
        },
        overrideProps: this.handleItemOverrides,
      }),
    )
  }

  renderComponent({ ElementType, classes, accessibility, variables, rest }) {
    const { children } = this.props
    return (
      <ElementType {...accessibility.attributes.root} {...rest} className={classes.root}>
        {childrenExist(children) ? children : this.renderItems(variables)}
      </ElementType>
    )
  }
}

export default Menu
