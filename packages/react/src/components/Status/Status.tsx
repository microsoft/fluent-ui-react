import { Accessibility, statusBehavior } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
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
import Icon, { IconProps } from '../Icon/Icon'

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

const Status: React.FC<WithAsProp<StatusProps>> & FluentComponentStaticProps = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(Icon.displayName, context.telemetry)
  setStart()

  const { className, color, icon, size, state, design, styles, variables } = props
  const { classes, styles: resolvedStyles } = useStyles(Status.displayName, {
    className: Status.className,
    mapPropsToStyles: () => ({
      color,
      size,
      state,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  })
  const getA11Props = useAccessibility(props.accessibility, {
    debugName: Status.displayName,
    rtl: context.rtl,
  })
  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(Status.handledProps, props)

  const iconElement = Icon.create(icon, {
    defaultProps: () =>
      getA11Props('icon', {
        size: 'smallest',
        styles: resolvedStyles.icon,
        xSpacing: 'none',
      }),
  })

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>
      {iconElement}
    </ElementType>
  )
  setEnd()

  return element
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
