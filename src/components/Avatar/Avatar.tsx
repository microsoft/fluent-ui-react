import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Image, Label, Icon } from '../../'

import { customPropTypes, UIComponent } from '../../lib'
import avatarRules from './avatarRules'

/**
 * An avatar is a graphic representation of user alongside with a presence icon.
 * @accessibility To be discussed
 *
 */
class Avatar extends UIComponent<any, any> {
  static className = 'ui-avatar'

  static displayName = 'Avatar'

  static handledProps = [
    'alt',
    'as',
    'className',
    'generateInitials',
    'name',
    'size',
    'src',
    'status',
  ]

  static rules = avatarRules

  static propTypes = {
    /** The alternative text for the image used in the Avatar. */
    alt: PropTypes.string,

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** The name used for displaying the initials of the avatar if the image is not provided. */
    name: PropTypes.string,

    /** Size multiplier (default 5) * */
    size: PropTypes.number,

    /** The src of the image used in the Avatar. */
    src: PropTypes.string,

    /** The presence of the user, used for showing different presence icon in the Avatar. */
    status: PropTypes.oneOf([
      'Available',
      'Away',
      'BeRightBack',
      'Busy',
      'DoNotDisturb',
      'Offline',
      'PresenceUnknown',
    ]),

    /** Custom method for generating the initials from the name property, shown in the avatar if there is no image provided. */
    generateInitials: PropTypes.func,
  }

  static defaultProps = {
    size: 5,
    generateInitials(name: string) {
      if (!name) {
        return ''
      }

      const reducedName = name
        .replace(/\s*\(.*?\)\s*/g, ' ')
        .replace(/\s*{.*?}\s*/g, ' ')
        .replace(/\s*\[.*?]\s*/g, ' ')

      const initials = reducedName
        .split(' ')
        .filter(item => item !== '')
        .map(name => name.charAt(0))
        .reduce((accumulator, currentValue) => accumulator + currentValue)

      if (initials.length > 2) {
        return initials.charAt(0) + initials.charAt(initials.length - 1)
      }
      return initials
    },
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

  renderComponent({ ElementType, classes, rest }) {
    const { src, alt, name, status, generateInitials, size } = this.props
    const { icon = '', color = '' } = Avatar.statusToIcon[status] || {}

    const iconVariables = {
      color: 'white',
      backgroundColor: color,
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {src ? (
          <Image className={classes.imageAvatar} avatar src={src} alt={alt} title={name} />
        ) : (
          <Label
            className={classes.avatarNameContainer}
            as="div"
            content={generateInitials(name)}
            variables={{ padding: '0px' }}
            circular
            title={name}
          />
        )}
        {status && (
          <div className={classes.presenceIndicatorWrapper}>
            <Icon
              className={classes.presenceIndicator}
              size={size < 4 ? 'micro' : size < 6 ? 'mini' : 'tiny'}
              circular
              name={icon}
              variables={iconVariables}
              title={status}
            />
          </div>
        )}
      </ElementType>
    )
  }
}

export default Avatar
