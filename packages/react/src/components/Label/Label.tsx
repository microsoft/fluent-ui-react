import { Accessibility } from '@fluentui/accessibility'
import {
  ComposableProps,
  useComposedConfig,
  getElementType,
  getUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import {
  childrenExist,
  createShorthandFactory,
  pxToRem,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
} from '../../utils'

import Icon, { IconProps } from '../Icon/Icon'
import Image, { ImageProps } from '../Image/Image'
import Layout from '../Layout/Layout'

import {
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types'

export interface LabelProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps,
    ComposableProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>

  /** A Label can be circular. */
  circular?: boolean

  /** A Label can take up the width of its container. */
  fluid?: boolean

  /** A Label can have an icon. */
  icon?: ShorthandValue<IconProps>

  /** A Label can position its Icon at the start or end of the layout. */
  iconPosition?: 'start' | 'end'

  /** A Label can contain an image. */
  image?: ShorthandValue<ImageProps>

  /** A Label can position its image at the start or end of the layout. */
  imagePosition?: 'start' | 'end'
}

const Label: React.FC<WithAsProp<LabelProps>> & FluentComponentStaticProps = props => {
  const {
    accessibility,
    children,
    className,
    circular,
    content,
    icon,
    iconPosition,
    design,
    styles,
    variables,
    image,
    imagePosition,
  } = props

  const compose = useComposedConfig(props)
  const context: ProviderContextPrepared = React.useContext(ThemeContext)

  const getA11Props = useAccessibility(accessibility, {
    debugName: Label.displayName,
    rtl: context.rtl,
    mapPropsToBehavior: () => compose.behaviorProps,
  })
  const { classes, styles: resolvedStyles } = useStyles(Label.displayName, {
    className: Label.className,
    mapPropsToStyles: () => ({
      hasActionableIcon: _.has(icon, 'onClick'),
      hasImage: !!image,
      circular,
      imagePosition,
      ...compose.styleProps,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,

    __experimental_composeName: compose.displayName,
    __experimental_overrideStyles: compose.overrideStyles,
  })

  const handleIconOverrides = iconProps => {
    return {
      ...(!iconProps.xSpacing && {
        xSpacing: 'none',
      }),
    }
  }

  const ElementType = getElementType(props)
  const unhandledProps = getUnhandledProps(
    [...Label.handledProps, ...compose.handledProps] as any,
    props,
  )

  if (childrenExist(children)) {
    return (
      <ElementType
        {...getA11Props('root', {
          className: classes.root,
          ...rtlTextContainer.getAttributes({ forElements: [children] }),
          ...unhandledProps,
        })}
      >
        {children}
      </ElementType>
    )
  }

  const imageElement = Image.create(image, {
    defaultProps: () => ({
      styles: resolvedStyles.image,
    }),
  })
  const iconElement = Icon.create(icon, {
    defaultProps: () => ({
      styles: resolvedStyles.icon,
    }),
    overrideProps: handleIconOverrides,
  })

  const startImage = imagePosition === 'start' && imageElement
  const startIcon = iconPosition === 'start' && iconElement
  const endIcon = iconPosition === 'end' && iconElement
  const endImage = imagePosition === 'end' && imageElement

  const hasStartElement = startImage || startIcon
  const hasEndElement = endIcon || endImage

  return (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...unhandledProps,
      })}
    >
      <Layout
        start={
          hasStartElement && (
            <>
              {startImage}
              {startIcon}
            </>
          )
        }
        main={content}
        end={
          hasEndElement && (
            <>
              {endIcon}
              {endImage}
            </>
          )
        }
        gap={pxToRem(3)}
      />
    </ElementType>
  )
}

Label.displayName = 'Label'
Label.className = 'ui-label'

Label.propTypes = {
  ...commonPropTypes.createCommon({ color: true }),
  circular: PropTypes.bool,
  icon: customPropTypes.itemShorthandWithoutJSX,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  image: customPropTypes.itemShorthandWithoutJSX,
  imagePosition: PropTypes.oneOf(['start', 'end']),
  fluid: PropTypes.bool,
}
Label.handledProps = Object.keys(Label.propTypes) as any

Label.defaultProps = {
  as: 'span',
  imagePosition: 'start',
  iconPosition: 'end',
}

Label.create = createShorthandFactory({ Component: Label, mappedProp: 'content' })

/**
 * A Label allows user to classify content.
 */
export default withSafeTypeForAs<typeof Label, LabelProps, 'span'>(Label)
