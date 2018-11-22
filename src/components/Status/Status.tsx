import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'
import { UIComponentProps } from '../../lib/commonPropInterfaces'
import { commonUIComponentPropTypes } from '../../lib/commonPropTypes'

export interface StatusProps extends UIComponentProps<any, any> {
  /** A custom color. */
  color?: string

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue

  /**
   * A custom render function the icon slot.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderIcon?: ShorthandRenderFunction

  /** Size multiplier */
  size?: number

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
}

/**
 * A status graphically represents someone's or something's state.
 */
class Status extends UIComponent<Extendable<StatusProps>, any> {
  static create: Function

  static className = 'ui-status'

  static displayName = 'Status'

  static propTypes = {
    ...commonUIComponentPropTypes,
    color: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    renderIcon: PropTypes.func,
    size: PropTypes.number,
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
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
            size: 'micro',
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

Status.create = createShorthandFactory(Status, 'state')

export default Status
export type StatusPropsWithDefaults = StatusProps & typeof Status.defaultProps
