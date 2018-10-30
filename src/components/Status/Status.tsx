import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'

export interface StatusProps {
  as?: any
  className?: string
  color?: string
  icon?: ShorthandValue
  renderIcon?: ShorthandRenderFunction
  size?: number
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * A status graphically represents someone's or something's state.
 */
class Status extends UIComponent<Extendable<StatusProps>, any> {
  static create: Function

  static className = 'ui-status'

  static displayName = 'Status'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** A custom color. */
    color: PropTypes.string,

    /** Shorthand for the icon, to provide customizing status */
    icon: customPropTypes.itemShorthand,

    /**
     * A custom render function the icon slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderIcon: PropTypes.func,

    /** Size multiplier */
    size: PropTypes.number,

    /** The pre-defined state values which can be consumed directly. */
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'span',
    size: 10,
    state: 'unknown',
  }

  renderComponent({ ElementType, classes, rest, variables, styles }) {
    const { icon, renderIcon } = this.props as StatusPropsWithDefaults
    return (
      <ElementType {...rest} className={classes.root}>
        {Icon.create(icon, {
          defaultProps: {
            size: 'tiny',
            styles: styles.icon,
            variables: variables.icon,
            xSpacing: 'none',
            render: renderIcon,
          },
        })}
      </ElementType>
    )
  }
}

Status.create = createShorthandFactory(Status, state => ({ state }))

export default Status
export type StatusPropsWithDefaults = StatusProps & typeof Status.defaultProps
