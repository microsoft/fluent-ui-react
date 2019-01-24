import * as PropTypes from 'prop-types'
import * as React from 'react'
import Icon from '../Icon/Icon'

import {
  customPropTypes,
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
} from '../../lib'
import { ReactProps, ShorthandValue } from '../../../types/utils'

export interface StatusProps extends UIComponentProps {
  /** A custom color. */
  color?: string

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue

  /** Size multiplier */
  size?: number

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
}

/**
 * A status graphically represents someone's or something's state.
 */
class Status extends UIComponent<ReactProps<StatusProps>, any> {
  static create: Function

  static className = 'ui-status'

  static displayName = 'Status'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    color: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    size: PropTypes.number,
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
  }

  static defaultProps = {
    as: 'span',
    size: 10,
    state: 'unknown',
  }

  renderComponent({ ElementType, classes, unhandledProps, variables, styles }) {
    const { icon } = this.props as StatusPropsWithDefaults
    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {Icon.create(icon, {
          defaultProps: {
            size: 'smallest',
            styles: styles.icon,
            variables: variables.icon,
            xSpacing: 'none',
          },
        })}
      </ElementType>
    )
  }
}

Status.create = createShorthandFactory(Status, 'state')

export default Status
export type StatusPropsWithDefaults = StatusProps & typeof Status.defaultProps
