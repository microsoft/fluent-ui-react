import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Image, Label, Icon } from '../../'

import { customPropTypes, UIComponent } from '../../lib'

/**
 * An avatar2 is a graphic representation of user alongside with a presence icon.
 * @accessibility To be discussed
 *
 */
class Avatar2 extends UIComponent<any, any> {
  static className = 'ui-avatar2'

  static displayName = 'Avatar2'

  static handledProps = [
    'alt',
    'as',
    'className',
    'getInitials',
    'name',
    'size',
    'avatarSize',
    'avatarType',
    'avatarState',
    'src',
    'status',
    'styles',
    'variables',
  ]

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

    /** actual size of the avatar should be rerieved from enum? i.e. "typeof avatarSize?" */
    avatarSize: PropTypes.string, // shouldn't this be a type known as avatarsize?

    /** avatar type - influences shape */
    avatarType: PropTypes.string,

    // ** avatar state - influences presence indicator */
    avatarState: PropTypes.string,

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
    getInitials: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    size: 5,
    avatarSize: 'medium',
    avatarType: 'bot',
    avatarState: 'unknown',
    getInitials(name: string) {
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

  renderComponent({ ElementType, classes, rest, styles }) {
    const { src, alt, name, status, getInitials, size } = this.props
    const { icon = '', color = '' } = Avatar2.statusToIcon[status] || {}

    const iconVariables = {
      color: 'white',
      backgroundColor: color,
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {src ? (
          <div>
            {/*
              <Image
                styles={{ root: styles.imageAvatar }}
                fluid
                avatar
                src={src}
                alt={alt}
                title={name}
              />

                This inline SVG will have some unnecessarily repeated items
                Need a way to separate out the clipping paths in order to not duplicate them for every avatar
            */}
            <svg viewBox="-2 0 36 34" width="36" height="36">
              <defs>
                <clipPath id="AvatarClipBot_M">
                  <path d="M23.93,2H10.07C9,2,8.01,2.57,7.47,3.5l-6.92,12c-0.54,0.93-0.54,2.07,0,3l6.93,12c0.54,0.93,1.53,1.5,2.6,1.5h13.85c1.07,0,2.06-0.57,2.6-1.5l6.93-12c0.54-0.93,0.54-2.07,0-3l-6.93-12C25.99,2.57,25,2,23.93,2z" />
                </clipPath>
                <clipPath id="AvatarClipPerson_M">
                  <path d="M23.93,2H10.07C9,2,8.01,2.57,7.47,3.5l-6.92,12c-0.54,0.93-0.54,2.07,0,3l6.93,12c0.54,0.93,1.53,1.5,2.6,1.5h13.85c1.07,0,2.06-0.57,2.6-1.5l6.93-12c0.54-0.93,0.54-2.07,0-3l-6.93-12C25.99,2.57,25,2,23.93,2z" />
                </clipPath>
              </defs>
              <image
                clipPath="url(#AvatarClipBot_M)"
                width="36"
                height="34"
                href={src}
                preserveAspectRatio="xMidYMid slice"
              />
              <path d="" />
            </svg>
          </div>
        ) : (
          <Label
            styles={{ root: styles.avatarNameContainer }}
            as="div"
            content={getInitials(name)}
            variables={{ padding: '0px' }}
            circular
            title={name}
          />
        )}
        {status && (
          <div className={classes.presenceIndicatorWrapper}>
            <Icon
              styles={{ root: styles.presenceIndicator }}
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

export default Avatar2

// https://jsfiddle.net/usq2v6ph/68/
