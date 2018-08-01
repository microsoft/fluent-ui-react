import PropTypes from 'prop-types'
import React from 'react'
import { Image, Label, Icon } from '../../'

import { customPropTypes, UIComponent } from '../../lib'
import avatarRules from './avatarRules'
import avatarVariables from './avatarVariables'

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

  static variables = avatarVariables

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

    generateInitials: PropTypes.func,
  }

  static defaultProps = {
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

  renderComponent({ ElementType, classes, rest }) {
    const { src, alt, name, status, generateInitials } = this.props
    const { icon = '', color = '' } = Avatar.statusToIcon[status] || {}
    const generateInitialsFunc = generateInitials || this.generateInitials
    return (
      <ElementType {...rest} className={classes.root}>
        {src ? (
          <Image
            className={classes.imageAvatar}
            avatar
            src={src}
            alt={alt}
            title={name}
            style={{ verticalAlign: 'top' }}
          />
        ) : (
          <Label
            className={classes.avatarLabel}
            as="div"
            content={generateInitialsFunc(name)}
            variables={{ padding: '0px' }}
            circular
            title={name}
          />
        )}
        {status && (
          <div className={classes.presenceDiv}>
            <Label
              className={classes.presenceIconLabel}
              as="div"
              variables={{ padding: '0px' }}
              style={{ background: color }}
              circular
              title={name}
            >
              <Icon
                size="mini"
                name={icon}
                color="white"
                style={avatarRules.presenceIcon()}
                title={status}
              />
            </Label>
          </div>
        )}
      </ElementType>
    )
  }

  generateInitials(nameParam: string): string {
    if (!nameParam) {
      return ''
    }

    const name = nameParam
      .replace(/\s*\(.*?\)\s*/g, ' ')
      .replace(/\s*{.*?}\s*/g, ' ')
      .replace(/\s*\[.*?]\s*/g, ' ')

    let names = name.split(' ')
    names = names.filter(item => item !== '')

    const initials = names
      .map(name => (name.length ? name.charAt(0) : ''))
      .reduce((accumulator, currentValue) => accumulator + currentValue)

    if (initials.length > 2) {
      return initials.charAt(0) + initials.charAt(initials.length - 1)
    }
    return initials
  }
}

export default Avatar
