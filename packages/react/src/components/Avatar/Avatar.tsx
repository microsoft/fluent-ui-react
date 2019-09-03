import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Image, { ImageProps } from '../Image/Image'
import Label, { LabelProps } from '../Label/Label'
import Status, { StatusProps } from '../Status/Status'
import { Accessibility } from '../../lib/accessibility/types'
import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types'
import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  SizeValue,
  ShorthandFactory,
} from '../../lib'

export interface AvatarProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility

  /** Shorthand for the image. */
  image?: ShorthandValue<ImageProps>

  /** Shorthand for the label. */
  label?: ShorthandValue<LabelProps>

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string

  /** Size multiplier. */
  size?: SizeValue

  /** Shorthand for the status of the user. */
  status?: ShorthandValue<StatusProps>

  /** Custom method for generating the initials from the name property, shown in the avatar if there is no image provided. */
  getInitials?: (name: string) => string
}

class Avatar extends UIComponent<WithAsProp<AvatarProps>, any> {
  static create: ShorthandFactory<AvatarProps>

  static className = 'ui-avatar'

  static displayName = 'Avatar'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    name: PropTypes.string,
    image: customPropTypes.itemShorthandWithoutJSX,
    label: customPropTypes.itemShorthand,
    size: customPropTypes.size,
    status: customPropTypes.itemShorthand,
    getInitials: PropTypes.func,
  }

  static defaultProps = {
    size: 'medium',
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
        .map(item => item.charAt(0))
        .reduce((accumulator, currentValue) => accumulator + currentValue)

      if (initials.length > 2) {
        return initials.charAt(0) + initials.charAt(initials.length - 1)
      }
      return initials
    },
  } as AvatarProps

  renderComponent({ accessibility, ElementType, classes, unhandledProps, styles, variables }) {
    const { name, status, image, label, getInitials, size } = this.props as AvatarProps

    return (
      <ElementType {...accessibility.attributes.root} {...unhandledProps} className={classes.root}>
        {Image.create(image, {
          defaultProps: {
            fluid: true,
            avatar: true,
            styles: styles.image,
          },
        })}
        {!image &&
          Label.create(label || {}, {
            defaultProps: {
              content: getInitials(name),
              circular: true,
              styles: styles.label,
            },
          })}
        {Status.create(status, {
          defaultProps: {
            size,
            styles: styles.status,
            variables: {
              borderColor: variables.statusBorderColor,
              borderWidth: variables.statusBorderWidth,
            },
          },
        })}
      </ElementType>
    )
  }
}

Avatar.create = createShorthandFactory({ Component: Avatar, mappedProp: 'name' })

/**
 * An Avatar is a graphic representation of a user.
 */
export default withSafeTypeForAs<typeof Avatar, AvatarProps>(Avatar)
