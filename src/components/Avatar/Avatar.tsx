import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Image, Label, StatusIndicator } from '../../'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ItemShorthand } from '../../../types/utils'

export interface IAvatarProps {
  alt?: string
  as?: any
  className?: string
  name?: string
  size?: number
  src?: string
  status?: ItemShorthand
  getInitials?: (name: string) => string
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * An avatar is a graphic representation of user alongside with a status icon.
 * @accessibility To be discussed
 *
 */
class Avatar extends UIComponent<Extendable<IAvatarProps>, any> {
  static create: Function

  static className = 'ui-avatar'

  static displayName = 'Avatar'

  static handledProps = [
    'alt',
    'as',
    'className',
    'getInitials',
    'name',
    'size',
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

    /** The src of the image used in the Avatar. */
    src: PropTypes.string,

    /** Shorthand for the status of the user */
    status: customPropTypes.itemShorthand,

    /** Custom method for generating the initials from the name property, shown in the avatar if there is no image provided. */
    getInitials: PropTypes.func,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    size: 5,
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

  renderComponent({ ElementType, classes, rest, styles }) {
    const { src, alt, name, status, getInitials, size } = this.props as IAvatarPropsWithDefaults

    return (
      <ElementType {...rest} className={classes.root}>
        {src ? (
          <Image
            styles={{ root: styles.imageAvatar }}
            fluid
            avatar
            src={src}
            alt={alt}
            title={name}
          />
        ) : (
          <Label
            styles={{ root: styles.avatarNameContainer }}
            as="div"
            content={getInitials(name || '')}
            variables={{ padding: '0px' }}
            circular
            title={name}
          />
        )}
        {StatusIndicator.create(status, {
          defaultProps: {
            styles: { root: styles.statusIndicator },
            size,
          },
        })}
      </ElementType>
    )
  }
}

Avatar.create = createShorthandFactory(Avatar, name => ({ name }))

export default Avatar

export type IAvatarPropsWithDefaults = IAvatarProps & typeof Avatar.defaultProps
