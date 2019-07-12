import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Accessibility } from '../../lib/accessibility/types'
import { menuDividerBehavior } from '../../lib/accessibility'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface MenuDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
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

class MenuDivider extends UIComponent<WithAsProp<MenuDividerProps>> {
  static displayName = 'MenuDivider'

  static create: Function

  static className = 'ui-menu__divider'

  static defaultProps = {
    as: 'li',
    accessibility: menuDividerBehavior as Accessibility,
  }

  static propTypes = {
    ...commonPropTypes.createCommon(),
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

MenuDivider.create = createShorthandFactory({ Component: MenuDivider, mappedProp: 'content' })

/**
 * A MenuDivider is non-focusable element that visually segments items of Menu.
 */
export default withSafeTypeForAs<typeof MenuDivider, MenuDividerProps, 'li'>(MenuDivider)
