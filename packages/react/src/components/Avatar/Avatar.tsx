import { Accessibility } from '@fluentui/accessibility'
import {
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Image, { ImageProps } from '../Image/Image'
import Label, { LabelProps } from '../Label/Label'
import Status, { StatusProps } from '../Status/Status'
import { WithAsProp, ShorthandValue, withSafeTypeForAs, ProviderContextPrepared } from '../../types'
import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue } from '../../utils'
// @ts-ignore
import { ThemeContext } from 'react-fela'

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

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string) => string
}

const Avatar = React.forwardRef<HTMLDivElement, WithAsProp<AvatarProps>>((props, ref) => {
  const {
    className,
    design,
    name,
    status,
    image,
    label,
    getInitials,
    size,
    styles,
    variables,
  } = props

  const { rtl }: ProviderContextPrepared = React.useContext(ThemeContext)
  const [classes, resolvedStyles] = useStyles(Avatar.displayName, {
    mapPropsToStyles: () => ({
      size,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl,
  })
  const getA11Props = useAccessibility(props.accessibility, {
    debugName: Avatar.displayName,
    rtl,
  })
  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps((Avatar as any).handledProps /* TODO */, props)

  return (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
      {Image.create(image, {
        defaultProps: () => ({
          fluid: true,
          avatar: true,
          title: name,
          styles: resolvedStyles.image,
        }),
      })}
      {!image &&
        Label.create(label || {}, {
          defaultProps: () => ({
            content: getInitials(name),
            circular: true,
            title: name,
            styles: resolvedStyles.label,
          }),
        })}
      {Status.create(status, {
        defaultProps: () => ({
          size,
          styles: resolvedStyles.status,
          // variables: {
          //   borderColor: variables.statusBorderColor,
          //   borderWidth: variables.statusBorderWidth,
          // },
          // TODO: Fix me please PLEASE PLEAASSEEE
        }),
      })}
    </ElementType>
  )
})
;(Avatar as any).className = 'ui-avatar'
Avatar.displayName = 'Avatar'
;(Avatar as any).propTypes = {
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
;(Avatar as any).handledProps = Object.keys((Avatar as any).propTypes)
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

// @ts-ignore
Avatar.create = createShorthandFactory({ Component: Avatar, mappedProp: 'name' })

/**
 * An Avatar is a graphical representation of a user.
 */
// @ts-ignore
export default withSafeTypeForAs<typeof Avatar, AvatarProps>(Avatar)
