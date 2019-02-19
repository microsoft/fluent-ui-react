import * as PropTypes from 'prop-types'
import * as React from 'react'
import Icon from '../Icon/Icon'

import {
  customPropTypes,
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  SizeValue,
} from '../../lib'
import { Accessibility } from '../../lib/accessibility/types'
import { defaultBehavior } from '../../lib/accessibility'
import { ReactProps, ShorthandValue } from '../../types'

export interface StatusProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default defaultBehavior
   */
  accessibility?: Accessibility

  /** A custom color. */
  color?: string

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue

  /** Size multiplier */
  size?: SizeValue

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
    accessibility: customPropTypes.accessibility,
    color: PropTypes.string,
    icon: customPropTypes.itemShorthand,
    size: customPropTypes.size,
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
  }

  static defaultProps = {
    accessibility: defaultBehavior,
    as: 'span',
    size: 'medium',
    state: 'unknown',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps, variables, styles }) {
    const { icon } = this.props as StatusProps
    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
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
