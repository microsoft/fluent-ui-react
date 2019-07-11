import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Icon from '../Icon/Icon'
import { statusBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import {
  UIComponent,
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  SizeValue,
} from '../../lib'
import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'

export interface StatusProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default statusBehavior
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

class Status extends UIComponent<WithAsProp<StatusProps>, any> {
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
    size: customPropTypes.size,
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
  }

  static defaultProps = {
    accessibility: statusBehavior,
    as: 'span',
    size: 'medium',
    state: 'unknown',
  }

  renderComponent({ accessibility, ElementType, classes, unhandledProps, variables, styles }) {
    const { icon } = this.props as StatusProps
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
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

Status.create = createShorthandFactory({ Component: Status, mappedProp: 'state' })

/**
 * A status graphically represents someone's or something's state.
 */
export default withSafeTypeForAs<typeof Status, StatusProps, 'span'>(Status)
