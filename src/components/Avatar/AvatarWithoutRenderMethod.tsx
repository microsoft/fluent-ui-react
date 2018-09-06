import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Image, Label, StatusIndicator } from '../../'

import { customPropTypes, UIComponent, createShorthandFactory } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ItemShorthand } from '../../../types/utils'

export interface IAvatarProps {
  as?: any
  className?: string
  image?: ItemShorthand
  label?: ItemShorthand
  name?: string
  size?: number
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
    'as',
    'className',
    'getInitials',
    'image',
    'label',
    'name',
    'size',
    'status',
    'styles',
    'variables',
  ]

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** The name used for displaying the initials of the avatar if the image is not provided. */
    name: PropTypes.string,

    /** Shorthand for the image */
    image: customPropTypes.itemShorthand,

    /** Shorthand for the label */
    label: customPropTypes.itemShorthand,

    /** Size multiplier (default 5) * */
    size: PropTypes.number,

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

  renderComponent({ ElementType, classes, rest, styles, variables }) {
    const { status, getInitials, image, label, size } = this.props as IAvatarPropsWithDefaults

    return (
      <ElementType {...rest} className={classes.root}>
        {Image.create(image, {
          defaultProps: {
            fluid: true,
            avatar: true,
            title: name,
            styles: { root: styles.imageAvatar },
          },
        })}
        {!image &&
          Label.create(label || {}, {
            defaultProps: {
              as: 'div',
              content: getInitials(name),
              circular: true,
              title: name,
              styles: { root: styles.avatarNameContainer },
              variables: { padding: '0px' },
            },
          })}
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
