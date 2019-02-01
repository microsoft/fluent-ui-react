import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Accessibility } from '../../lib/accessibility/types'
import { menuDividerBehavior } from '../../lib/accessibility'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ColorComponentProps,
  commonPropTypes,
} from '../../lib'
import { ReactProps } from '../../../types/utils'

export interface MenuDividerProps extends UIComponentProps, ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default menuDividerBehavior
   */
  accessibility?: Accessibility

  vertical?: boolean
  primary?: boolean
  secondary?: boolean
}

/**
 * A menu divider visually segments menu items inside menu.
 */
class MenuDivider extends UIComponent<ReactProps<MenuDividerProps>, any> {
  static displayName = 'MenuDivider'

  static create: Function

  static className = 'ui-menu__divider'

  static defaultProps = {
    as: 'li',
    accessibility: menuDividerBehavior as Accessibility,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ content: false, children: false, color: true }),
    accessibility: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      />
    )
  }
}

MenuDivider.create = createShorthandFactory(MenuDivider, 'color')

export default MenuDivider
