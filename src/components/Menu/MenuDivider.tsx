import * as React from 'react'
import * as PropTypes from 'prop-types'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ColorComponentProps,
  commonPropTypes,
} from '../../lib'
import { ReactProps } from '../../../types/utils'

export interface MenuDividerProps extends UIComponentProps, ColorComponentProps {
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

  static propTypes = {
    ...commonPropTypes.createCommon({ content: false, children: false, color: true }),
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType {...rest} className={classes.root} />
  }
}

MenuDivider.create = createShorthandFactory(MenuDivider, 'color')

export default MenuDivider
