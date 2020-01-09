import { Accessibility, statusBehavior } from '@fluentui/accessibility'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Icon, { IconProps } from '../Icon/Icon'

import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue } from '../../utils'
import { WithAsProp, ShorthandValue, withSafeTypeForAs, ProviderContextPrepared } from '../../types'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings'
// @ts-ignore
import { ThemeContext } from 'react-fela'

export interface StatusProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>

  /** A custom color. */
  color?: string

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue<IconProps>

  /** Size multiplier */
  size?: SizeValue

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
}

const Status = React.forwardRef<HTMLDivElement, WithAsProp<StatusProps>>((props, ref) => {
  const { className, color, icon, size, state, design, styles, variables } = props
  // @ts-ignore
  const { displayName, mapPropsToBehavior, mapPropsToStyles, overrideStyles, shouldForwardProp } =
    props.__unstable_config || {}

  const { rtl }: ProviderContextPrepared = React.useContext(ThemeContext)
  const magicName = overrideStyles
    ? displayName || Status.displayName
    : [Status.displayName, displayName].filter(Boolean)
  // @ts-ignore
  // @ts-ignore
  const [classes, resolvedStyles] = useStyles(magicName, {
    // magic name is not cool, too
    className: (Status as any).className,
    mapPropsToStyles: () => ({
      color,
      size,
      state,
      ...(mapPropsToStyles && mapPropsToStyles(props)), // This is not cool
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    // <CallMenu />
    // <div className="call-menu my-custom-classname" />
    rtl,

    // @ts-ignore
    __experimental_variant: displayName,
    __expirimental_overwrite: overrideStyles,
  })
  const getA11Props = useAccessibility(props.accessibility, {
    debugName: displayName || Status.displayName,
    mapPropsToBehavior: mapPropsToBehavior ? () => mapPropsToBehavior(props) : undefined,
    rtl,
  })
  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(
    (Status as any).handledProps /* TODO */,
    props,
    shouldForwardProp,
  )

  // 1: shouldHandleProp should work!
  // 2: Fix typings, no any!
  // 3: const [] = useComposeConfig()

  console.log(getA11Props('root', {}))
  return (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
      {Icon.create(icon, {
        defaultProps: () =>
          getA11Props('icon', {
            size: 'smallest',
            styles: resolvedStyles.icon,
            xSpacing: 'none',
          }),
      })}
    </ElementType>
  )
})
;(Status as any).className = 'ui-status'
;(Status as any).displayName = 'Status'
;(Status as any).propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  color: PropTypes.string,
  icon: customPropTypes.itemShorthandWithoutJSX,
  size: customPropTypes.size,
  state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
}
;(Status as any).handledProps = [...Object.keys((Status as any).propTypes), '__unstable_config']
Status.defaultProps = {
  accessibility: statusBehavior,
  as: 'span',
  size: 'medium',
  state: 'unknown',
}

// @ts-ignore
Status.create = createShorthandFactory({ Component: Status, mappedProp: 'state' })

/**
 * A Status represents someone's or something's state.
 *
 * @accessibility
 * Implements [ARIA img](https://www.w3.org/TR/wai-aria-1.1/#img) role.
 */
// @ts-ignore
export default withSafeTypeForAs<typeof Status, StatusProps, 'span'>(Status)
