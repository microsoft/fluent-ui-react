import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  AutoControlledComponent,
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getKindProp,
  rtlTextContainer,
} from '../../lib'
import MenuItem from './MenuItem'
import { menuBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactAccessibilityBehavior } from '../../lib/accessibility/reactTypes'

import { ComponentVariablesObject, ComponentSlotStylesPrepared } from '../../themes/types'
import { WithAsProp, ShorthandCollection, ShorthandValue, withSafeTypeForAs } from '../../types'
import MenuDivider from './MenuDivider'

export type MenuShorthandKinds = 'divider' | 'item'

export interface MenuSlotClassNames {
  divider: string
  item: string
}

export interface MenuProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuBehavior
   * @available menuAsToolbarBehavior, tabListBehavior
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

class Menu extends AutoControlledComponent<WithAsProp<MenuProps>, MenuState> {
  static displayName = 'Menu'

  static className = 'ui-menu'

  static slotClassNames: MenuSlotClassNames = {
    divider: `${Menu.className}__divider`,
    item: `${Menu.className}__item`,
  }

  static create: Function

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
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

  renderItems = (
    styles: ComponentSlotStylesPrepared,
    variables: ComponentVariablesObject,
    accessibility: ReactAccessibilityBehavior,
  ) => {
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
    const itemsCount = _.filter(items, item => getKindProp(item, 'item') !== 'divider').length
    let itemPosition = 0

    return _.map(items, (item, index) => {
      const active =
        (typeof activeIndex === 'string' ? parseInt(activeIndex, 10) : activeIndex) === index
      const kind = getKindProp(item, 'item')

      if (kind === 'divider') {
        return MenuDivider.create(item, {
          defaultProps: {
            className: Menu.slotClassNames.divider,
            primary,
            secondary,
            vertical,
            variables,
            styles: styles.divider,
            inSubmenu: submenu,
            accessibility: accessibility.childBehaviors
              ? accessibility.childBehaviors.divider
              : undefined,
          },
        })
      }

      itemPosition++

      return MenuItem.create(item, {
        defaultProps: {
          className: Menu.slotClassNames.item,
          iconOnly,
          pills,
          pointing,
          primary,
          secondary,
          underlined,
          variables,
          vertical,
          index,
          itemPosition,
          itemsCount,
          active,
          inSubmenu: submenu,
          indicator,
          accessibility: accessibility.childBehaviors
            ? accessibility.childBehaviors.item
            : undefined,
        },
        overrideProps: this.handleItemOverrides,
      })
    })
  }

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children } = this.props
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(styles, variables, accessibility)}
      </ElementType>
    )
  }
}

Menu.create = createShorthandFactory({ Component: Menu, mappedArrayProp: 'items' })

/**
 * A menu displays grouped navigation actions.
 * @category actionable
 * @accessibility
 * Implements ARIA [Menu](https://www.w3.org/TR/wai-aria-practices-1.1/#menu), [Toolbar](https://www.w3.org/TR/wai-aria-practices-1.1/#toolbar) or [Tabs](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) design pattern, depending on the behavior used.
 * Do choose desired accessibility behavior depending on the use case.
 * Do provide label to the Menu component using aria-label or aria-labelledby prop.
 */
export default withSafeTypeForAs<typeof Menu, MenuProps, 'ul'>(Menu)
