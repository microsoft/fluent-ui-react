import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  pxToRem,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
} from '../../lib'

import Icon from '../Icon/Icon'
import Image from '../Image/Image'
import Layout from '../Layout/Layout'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps, ShorthandValue } from '../../../types/utils'
import { ComplexColorPropType } from '../../lib/commonPropInterfaces'

export interface LabelProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps<ComplexColorPropType> {
  accessibility?: Accessibility

  /** A Label can be circular. */
  circular?: boolean

  /** A Label can take up the width of its container. */
  fluid?: boolean

  /** A Label can have an icon. */
  icon?: ShorthandValue

  /** A Label can position its Icon at the start or end of the layout. */
  iconPosition?: 'start' | 'end'

  /** A Label can contain an image. */
  image?: ShorthandValue

  /** A Label can position its image at the start or end of the layout. */
  imagePosition?: 'start' | 'end'
}

/**
 * A Label is used to classify content.
 */
class Label extends UIComponent<ReactProps<LabelProps>, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    ...commonPropTypes.createCommon({ color: 'complex' }),
    circular: PropTypes.bool,
    icon: customPropTypes.itemShorthand,
    iconPosition: PropTypes.oneOf(['start', 'end']),
    image: customPropTypes.itemShorthand,
    imagePosition: PropTypes.oneOf(['start', 'end']),
    fluid: PropTypes.bool,
  }

  static defaultProps = {
    as: 'span',
    imagePosition: 'start',
    iconPosition: 'end',
  }

  handleIconOverrides = iconProps => {
    return {
      ...(iconProps.onClick && { tabIndex: '0' }),
      ...(!iconProps.xSpacing && {
        xSpacing: 'none',
      }),
    }
  }

  renderComponent({ ElementType, classes, unhandledProps, variables, styles }) {
    const { children, content, icon, iconPosition, image, imagePosition } = this.props

    if (childrenExist(children)) {
      return (
        <ElementType
          {...rtlTextContainer.getAttributes({ forElements: [children] })}
          {...unhandledProps}
          className={classes.root}
        >
          {children}
        </ElementType>
      )
    }

    const imageElement = Image.create(image, {
      defaultProps: {
        styles: styles.image,
        variables: variables.image,
      },
    })
    const iconElement = Icon.create(icon, {
      defaultProps: {
        styles: styles.icon,
        variables: variables.icon,
      },
      overrideProps: this.handleIconOverrides,
    })

    const startImage = imagePosition === 'start' && imageElement
    const startIcon = iconPosition === 'start' && iconElement
    const endIcon = iconPosition === 'end' && iconElement
    const endImage = imagePosition === 'end' && imageElement

    const hasStartElement = startImage || startIcon
    const hasEndElement = endIcon || endImage

    return (
      <ElementType {...unhandledProps} className={classes.root}>
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
}

Label.create = createShorthandFactory(Label, 'content')

export default Label
