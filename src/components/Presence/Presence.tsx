import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon } from '../../'

import { customPropTypes, UIComponent } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export interface IPresenceProps {
  as?: any
  className?: string
  size?: number
  status?:
    | 'Available'
    | 'Away'
    | 'BeRightBack'
    | 'Busy'
    | 'DoNotDisturb'
    | 'Offline'
    | 'PresenceUnknown'
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A presence is a graphical representation of user's availability
 */
class Presence extends UIComponent<Extendable<IPresenceProps>, any> {
  static className = 'ui-presence'

  static displayName = 'Presence'

  static handledProps = ['as', 'className', 'size', 'status', 'styles', 'variables']

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Size multiplier (default 5) * */
    size: PropTypes.number,

    /** The presence of the user, used for showing different icon */
    status: PropTypes.oneOf([
      'Available',
      'Away',
      'BeRightBack',
      'Busy',
      'DoNotDisturb',
      'Offline',
      'PresenceUnknown',
    ]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
    size: 5,
  }

  static statusToIcon = {
    Available: {
      icon: 'check',
      color: 'green',
    },
    Busy: {
      icon: '',
      color: 'red',
    },
    DoNotDisturb: {
      icon: 'minus',
      color: 'red',
    },
    Away: {
      icon: 'clock',
      color: 'yellow',
    },
    BeRightBack: {
      icon: 'clock',
      color: 'yellow',
    },
    Offline: {
      icon: '',
      color: 'grey',
    },
    PresenceUnknown: {
      icon: '',
      color: 'grey',
    },
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { status, size } = this.props as IPresencePropsWithDefaults
    const { icon = '', color = '' } = (status && Presence.statusToIcon[status]) || {}

    const iconVariables = {
      color: 'white',
      backgroundColor: color,
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {status && (
          <Icon
            styles={{ root: styles.presenceIcon }}
            size={size < 4 ? 'micro' : size < 6 ? 'mini' : 'tiny'}
            circular
            name={icon}
            variables={iconVariables}
          />
        )}
      </ElementType>
    )
  }
}

export default Presence

export type IPresencePropsWithDefaults = IPresenceProps & typeof Presence.defaultProps
