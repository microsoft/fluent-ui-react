import { Accessibility, menuDividerBehavior } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import { ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types'
import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  childrenExist,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils'

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

const MenuDivider: React.FC<WithAsProp<MenuDividerProps>> & {
  className: string
  create: ShorthandFactory<MenuDividerProps>
  handledProps: string[]
} = props => {
  const {
    accessibility,
    children,
    className,
    content,
    design,
    inSubmenu,
    primary,
    secondary,
    styles,
    variables,
    vertical,
  } = props

  const context: ProviderContextPrepared = React.useContext(ThemeContext)

  const getA11Props = useAccessibility(accessibility, {
    debugName: MenuDivider.displayName,
    rtl: context.rtl,
  })
  const { classes } = useStyles(MenuDivider.displayName, {
    className: MenuDivider.className,
    mapPropsToStyles: () => ({ inSubmenu, primary, secondary, vertical }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  })

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(MenuDivider.handledProps as any, props)

  return (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  )
}

MenuDivider.className = 'ui-menu__divider'
MenuDivider.displayName = 'MenuDivider'

MenuDivider.defaultProps = {
  as: 'li',
  accessibility: menuDividerBehavior as Accessibility,
}
MenuDivider.propTypes = {
  ...commonPropTypes.createCommon(),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  vertical: PropTypes.bool,
  inSubmenu: PropTypes.bool,
}
MenuDivider.handledProps = Object.keys(MenuDivider.propTypes)

MenuDivider.create = createShorthandFactory({ Component: MenuDivider, mappedProp: 'content' })

/**
 * A MenuDivider is non-actionable element that visually segments items of Menu.
 */
export default withSafeTypeForAs<typeof MenuDivider, MenuDividerProps, 'li'>(MenuDivider)
