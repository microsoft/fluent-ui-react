import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Image, Label, Status } from '../../'

import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import { Extendable, ShorthandRenderFunction, ShorthandValue } from '../../../types/utils'

export interface AvatarProps {
  as?: any
  className?: string
  image?: ShorthandValue
  label?: ShorthandValue
  name?: string
  renderImage?: ShorthandRenderFunction
  renderLabel?: ShorthandRenderFunction
  renderStatus?: ShorthandRenderFunction
  size?: number
  status?: ShorthandValue
  getInitials?: (name: string) => string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * An avatar is a graphic representation of user.
 */
class Avatar extends UIComponent<Extendable<AvatarProps>, any> {
  static create: Function

  static className = 'ui-avatar'

  static displayName = 'Avatar'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** The name used for displaying the initials of the avatar if the image is not provided. */
    name: PropTypes.string,

    /** Shorthand for the image. */
    image: customPropTypes.itemShorthand,

    /** Shorthand for the label. */
    label: customPropTypes.itemShorthand,

    /** Size multiplier. */
    size: PropTypes.number,

    /** Shorthand for the status of the user. */
    status: customPropTypes.itemShorthand,

    /** Custom method for generating the initials from the name property, shown in the avatar if there is no image provided. */
    getInitials: PropTypes.func,

    /**
     * A custom render function the image slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderImage: PropTypes.func,

    /**
     * A custom render function the label slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderLabel: PropTypes.func,

    /**
     * A custom render function the status slot.
     *
     * @param {React.ReactType} Component - The computed component for this slot.
     * @param {object} props - The computed props for this slot.
     * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
     */
    renderStatus: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    size: 32,
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
    const { name, status, image, label, getInitials, renderImage, renderLabel, renderStatus } = this
      .props as AvatarPropsWithDefaults

    return (
      <ElementType {...rest} className={classes.root}>
        {Image.create(image, {
          defaultProps: {
            fluid: true,
            avatar: true,
            title: name,
            styles: styles.image,
          },
          render: renderImage,
        })}
        {!image &&
          !renderImage &&
          Label.create(label || {}, {
            defaultProps: {
              as: 'div',
              content: getInitials(name),
              circular: true,
              title: name,
              styles: styles.label,
            },
            render: renderLabel,
          })}
        {Status.create(status, {
          defaultProps: {
            styles: styles.status,
            variables: {
              borderColor: variables.statusBorderColor,
              borderWidth: variables.statusBorderWidth,
            },
          },
          render: renderStatus,
        })}
      </ElementType>
    )
  }
}

Avatar.create = createShorthandFactory(Avatar, 'name')

export default Avatar

export type AvatarPropsWithDefaults = AvatarProps & typeof Avatar.defaultProps
