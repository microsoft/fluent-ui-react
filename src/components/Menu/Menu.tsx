import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getKindProp,
  rtlTextContainer,
} from '../../lib'
import MenuItem from './MenuItem'
import { menuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import { ComponentVariablesObject } from '../../themes/types'
import { ReactProps, ShorthandCollection, ShorthandValue } from '../../../types/utils'
import MenuDivider from './MenuDivider'

export type MenuShorthandKinds = 'divider' | 'item'

export interface MenuProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuBehavior
   * @available toolbarBehavior, tabListBehavior
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
  items?: ShorthandCollection<MenuShorthandKinds>

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

  /** Indicates whether the menu is submenu. */
  submenu?: boolean

  /** Shorthand for the submenu indicator. */
  indicator?: ShorthandValue
}

export interface MenuState {
  activeIndex?: number | string
}

/**
 * A menu displays grouped navigation actions.
 * @accessibility
 * Implements ARIA Menu, Toolbar or Tabs design pattern, depending on the behavior used.
 */
class Menu extends AutoControlledComponent<ReactProps<MenuProps>, MenuState> {
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
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
    pills: PropTypes.bool,
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
    submenu: PropTypes.bool,
    indicator: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: menuBehavior as Accessibility,
  }

  static autoControlledProps = ['activeIndex']

  static Item = MenuItem
  static Divider = MenuDivider

  handleItemOverrides = predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps

      this.trySetState({ activeIndex: index })

      _.invoke(predefinedProps, 'onClick', e, itemProps)
    },
    onActiveChanged: (e, props) => {
      const { index, active } = props
      if (active) {
        this.trySetState({ activeIndex: index })
      } else if (this.state.activeIndex === index) {
        this.trySetState({ activeIndex: null })
      }
      _.invoke(predefinedProps, 'onActiveChanged', e, props)
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
      submenu,
      indicator,
    } = this.props
    const { activeIndex } = this.state

    return _.map(items, (item, index) => {
      const active =
        (typeof activeIndex === 'string' ? parseInt(activeIndex, 10) : activeIndex) === index
      const kind = getKindProp(item, 'item')

      if (kind === 'divider') {
        return MenuDivider.create(item, {
          defaultProps: {
            primary,
            secondary,
            vertical,
            variables,
          },
        })
      }

      return MenuItem.create(item, {
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
          active,
          inSubmenu: submenu,
          indicator,
        },
        overrideProps: this.handleItemOverrides,
      })
    })
  }

  renderComponent({ ElementType, classes, accessibility, variables, unhandledProps }) {
    const { children } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(variables)}
      </ElementType>
    )
  }
}

Menu.create = createShorthandFactory(Menu, 'items')

export default Menu
