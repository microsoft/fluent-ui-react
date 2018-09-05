import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ItemShorthand } from '../../../types/utils'

export interface IStatusIndicatorProps {
  as?: any
  className?: string
  size?: number
  icon?: ItemShorthand
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A status indicator is a graphical representation of user's status
 */
class StatusIndicator extends UIComponent<Extendable<IStatusIndicatorProps>, any> {
  static create: Function

  static className = 'ui-statusindicator'

  static displayName = 'StatusIndicator'

  static handledProps = ['as', 'className', 'size', 'icon', 'styles', 'variables']

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Size multiplier (default 5) * */
    size: PropTypes.number,

    /** Shorthand for the icon */
    icon: customPropTypes.itemShorthand,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
    size: 5,
    icon: {
      name: '',
      variables: {
        color: 'white',
        backgroundColor: 'grey',
      },
    },
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { icon, size } = this.props as IStatusIndicatorPropsWithDefaults
    return (
      <ElementType {...rest} className={classes.root}>
        {Icon.create(icon, {
          defaultProps: {
            styles: { root: styles.statusIcon },
            circular: true,
            size: size < 4 ? 'micro' : size < 6 ? 'mini' : 'tiny',
          },
        })}
      </ElementType>
    )
  }
}

StatusIndicator.create = createShorthandFactory(StatusIndicator, icon => ({ icon }))

export default StatusIndicator
export type IStatusIndicatorPropsWithDefaults = IStatusIndicatorProps &
  typeof StatusIndicator.defaultProps
