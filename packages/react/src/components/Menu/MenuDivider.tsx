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
  rtlTextContainer,
} from '../../lib'
import { StardustProps } from '../../types'

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
  inSubmenu?: boolean
}

/**
 * A menu divider visually segments menu items inside menu.
 */
class MenuDivider<TAs = 'li'> extends UIComponent<StardustProps<MenuDividerProps, TAs>> {
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
    inSubmenu: PropTypes.bool,
  }

  renderComponent({ ElementType, classes, unhandledProps, accessibility }) {
    const { children, content } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

MenuDivider.create = createShorthandFactory<MenuDividerProps>({
  Component: MenuDivider,
  mappedProp: 'color',
})

export default MenuDivider
