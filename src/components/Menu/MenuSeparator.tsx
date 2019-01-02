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

export interface MenuSeparatorProps extends UIComponentProps, ColorComponentProps {
  vertical?: boolean
  primary?: boolean
  secondary?: boolean
  kind?: string
}

/**
 * A menu separator visually segments menu items inside menu.
 */
class MenuSeparator extends UIComponent<ReactProps<MenuSeparatorProps>, any> {
  static displayName = 'MenuSeparator'

  static create: Function

  static className = 'ui-menu__separator'

  static propTypes = {
    ...commonPropTypes.createCommon({ content: false, children: false, color: true }),
    kind: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType {...rest} className={classes.root} />
  }
}

MenuSeparator.create = createShorthandFactory(MenuSeparator, 'color')

export default MenuSeparator
