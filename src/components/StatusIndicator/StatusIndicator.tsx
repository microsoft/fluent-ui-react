import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'

import { customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from 'theme'
import { Extendable } from 'utils'

export interface IStatusIndicatorProps {
  as?: any
  className?: string
  size?: number
  status?: string
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A status indicator is a graphical representation of user's status
 */
class StatusIndicator extends UIComponent<Extendable<IStatusIndicatorProps>, any> {
  static className = 'ui-statusindicator'

  static displayName = 'StatusIndicator'

  static handledProps = ['as', 'className', 'size', 'status', 'styles', 'variables']

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Size multiplier (default 5) * */
    size: PropTypes.number,

    /** The status of the user, used for showing different icon */
    status: PropTypes.string,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
    size: 5,
  }

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { status, size } = this.props as IStatusIndicatorPropsWithDefaults
    const { iconName = '', iconColor = '', indicatorColor = '' } =
      (status && variables[status]) || {}

    const iconVariables = {
      color: iconColor,
      backgroundColor: indicatorColor,
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {status && (
          <Icon
            styles={{ root: styles.statusIcon }}
            size={size < 4 ? 'micro' : size < 6 ? 'mini' : 'tiny'}
            circular
            name={iconName}
            variables={iconVariables}
          />
        )}
      </ElementType>
    )
  }
}

export default StatusIndicator

export type IStatusIndicatorPropsWithDefaults = IStatusIndicatorProps &
  typeof StatusIndicator.defaultProps
