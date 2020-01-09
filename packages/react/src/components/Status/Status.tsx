import { Accessibility, statusBehavior } from '@fluentui/accessibility'
import {
  ComposableProps,
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useComposedConfig,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue } from '../../utils'
import {
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  ProviderContextPrepared,
  FluentComponentStaticProps,
} from '../../types'
import StatusIcon, { StatusIconProps } from './StatusIcon'

export interface StatusProps extends UIComponentProps, ComposableProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>

  /** A custom color. */
  color?: string

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue<StatusIconProps>

  /** Size multiplier */
  size?: SizeValue

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
}

const Status: React.FC<WithAsProp<StatusProps>> &
  FluentComponentStaticProps &
  ComposableProps = props => {
  const { className, color, icon, size, state, design, styles, variables } = props

  const compose = useComposedConfig(props)
  const { rtl }: ProviderContextPrepared = React.useContext(ThemeContext)

  const { classes } = useStyles(Status.displayName, {
    className: Status.className,
    mapPropsToStyles: () => ({
      color,
      size,
      state,
      ...compose.styleProps,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl,

    __experimental_composeName: compose.displayName,
    __experimental_overrideStyles: compose.overrideStyles,
  })
  const getA11Props = useAccessibility(props.accessibility, {
    debugName: compose.displayName || Status.displayName,
    mapPropsToBehavior: () => compose.behaviorProps,
    rtl,
  })
  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(
    [...Status.handledProps, ...compose.handledProps] as any,
    props,
  )

  // @ts-ignore
  const iconElement = StatusIcon.create(icon, {
    defaultProps: () => getA11Props('icon', { state }),
  })

  return (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>
      {iconElement}
    </ElementType>
  )
}

Status.className = 'ui-status'
Status.displayName = 'Status'
Status.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  color: PropTypes.string,
  icon: customPropTypes.itemShorthandWithoutJSX,
  size: customPropTypes.size,
  state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
}
Status.handledProps = Object.keys(Status.propTypes) as any
Status.defaultProps = {
  accessibility: statusBehavior,
  as: 'span',
  size: 'medium',
  state: 'unknown',
}

Status.create = createShorthandFactory({ Component: Status, mappedProp: 'state' })

/**
 * A Status represents someone's or something's state.
 *
 * @accessibility
 * Implements [ARIA img](https://www.w3.org/TR/wai-aria-1.1/#img) role.
 */
export default withSafeTypeForAs<typeof Status, StatusProps, 'span'>(Status)
