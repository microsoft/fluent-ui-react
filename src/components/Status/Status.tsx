import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ItemShorthand } from '../../../types/utils'

export interface IStatusProps {
  as?: any
  className?: string
  color?: string
  icon?: ItemShorthand
  size?: number
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A status graphically represents someone's or something's state.
 */
class Status extends UIComponent<Extendable<IStatusProps>, any> {
  static create: Function

  static className = 'ui-status'

  static displayName = 'Status'

  static handledProps = ['as', 'className', 'color', 'icon', 'size', 'state', 'styles', 'variables']

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** A custom color. */
    color: PropTypes.string,

    /** Shorthand for the icon, to provide customizing status */
    icon: customPropTypes.itemShorthand,

    /** Size multiplier */
    size: PropTypes.number,

    /** The pre-defined state values which can be consumed directly. */
    state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'span',
    size: 10,
    state: 'unknown',
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { icon } = this.props as IStatusPropsWithDefaults
    return (
      <ElementType {...rest} className={classes.root}>
        {Icon.create(icon, {
          defaultProps: {
            size: 'tiny',
            variables: { color: 'white' }, // This is temporary. There is a ToDo to use icon's text/fill color for box-shadow, currently it uses color
            xSpacing: 'none',
          },
        })}
      </ElementType>
    )
  }
}

Status.create = createShorthandFactory(Status, state => ({ state }))

export default Status
export type IStatusPropsWithDefaults = IStatusProps & typeof Status.defaultProps
