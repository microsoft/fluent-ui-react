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
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
} from '../../lib'
import { ReactProps } from '../../types'

export interface MenuDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
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
class MenuDivider extends UIComponent<ReactProps<MenuDividerProps>> {
  static displayName = 'MenuDivider'

  static create: Function

  static className = 'ui-menu__divider'

  static defaultProps = {
    as: 'li',
    accessibility: menuDividerBehavior as Accessibility,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    const { children, content } = this.props

    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

MenuDivider.create = createShorthandFactory(MenuDivider, 'color')

export default MenuDivider
