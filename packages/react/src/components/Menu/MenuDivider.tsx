import { Accessibility, menuDividerBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import { useKeyOnly } from '../../lib/classNameBuilders'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface MenuDividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  vertical?: boolean
  primary?: boolean
  secondary?: boolean
  inSubmenu?: boolean
}

class MenuDivider extends UIComponent<WithAsProp<MenuDividerProps>> {
  static displayName = 'MenuDivider'

  static create: ShorthandFactory<MenuDividerProps>

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

  renderComponent({ ElementType, classes, unhandledProps, accessibility, theme }) {
    const { children, content, primary, secondary, vertical, inSubmenu } = this.props

    const propClasses = cx(
      theme.name,
      useKeyOnly(primary, 'primary'),
      useKeyOnly(secondary, 'secondary'),
      useKeyOnly(vertical, 'vertical'),
      useKeyOnly(inSubmenu, 'inSubmenu'),
      useKeyOnly(content, 'content'),
    )

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...unhandledProps}
        className={cx(MenuDivider.className, propClasses, classes.root)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

MenuDivider.create = createShorthandFactory({ Component: MenuDivider, mappedProp: 'content' })

/**
 * A MenuDivider is non-actionable element that visually segments items of Menu.
 */
export default withSafeTypeForAs<typeof MenuDivider, MenuDividerProps, 'li'>(MenuDivider)
