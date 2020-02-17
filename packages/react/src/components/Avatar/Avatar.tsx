import { Accessibility } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import AvatarImage, { AvatarImageProps } from './AvatarImage'
import AvatarLabel, { AvatarLabelProps } from './AvatarLabel'
import {
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types'
import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue } from '../../utils'
import AvatarStatus, { AvatarStatusProps } from './AvatarStatus'

export interface AvatarProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>

  /** Shorthand for the image. */
  image?: ShorthandValue<AvatarImageProps>

  /** Shorthand for the label. */
  label?: ShorthandValue<AvatarLabelProps>

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string

  /** Size multiplier. */
  size?: SizeValue

  /** Shorthand for the status of the user. */
  status?: ShorthandValue<AvatarStatusProps>

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string) => string
}

const Avatar: React.FC<WithAsProp<AvatarProps>> &
  FluentComponentStaticProps<AvatarProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext)
  const { setStart, setEnd } = useTelemetry(Avatar.displayName, context.telemetry)
  setStart()

  const {
    accessibility,
    className,
    design,
    getInitials,
    label,
    image,
    name,
    size,
    status,
    styles,
    variables,
  } = props

  const getA11Props = useAccessibility(accessibility, {
    debugName: Avatar.displayName,
    rtl: context.rtl,
  })
  const { classes } = useStyles(Avatar.displayName, {
    className: Avatar.className,
    mapPropsToStyles: () => ({ size }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
  })

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(Avatar.handledProps, props)

  // @ts-ignore
  const imageElement = AvatarImage.create(image, {
    defaultProps: () =>
      getA11Props('image', {
        fluid: true,
        avatar: true,
        title: name,
      }),
  })
  // @ts-ignore
  const statusElement = AvatarStatus.create(status, {
    defaultProps: () =>
      getA11Props('status', {
        size,
      }),
  })
  // @ts-ignore
  const labelElement = AvatarLabel.create(label || {}, {
    defaultProps: () =>
      getA11Props('label', {
        content: getInitials(name),
        title: name,
        size,
      }),
  })

  const result = (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>
      {imageElement}
      {!image && labelElement}
      {statusElement}
    </ElementType>
  )

  setEnd()

  return result
}

Avatar.className = 'ui-avatar'
Avatar.displayName = 'Avatar'

Avatar.defaultProps = {
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
}

Avatar.propTypes = {
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
Avatar.handledProps = Object.keys(Avatar.propTypes) as any

Avatar.create = createShorthandFactory({ Component: Avatar, mappedProp: 'name' })

/**
 * An Avatar is a graphical representation of a user.
 */
export default withSafeTypeForAs<typeof Avatar, AvatarProps>(Avatar)
