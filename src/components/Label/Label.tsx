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
} from '../../lib'

import Icon from '../Icon/Icon'
import Image from '../Image/Image'
import Layout from '../Layout/Layout'
import { Accessibility } from '../../lib/accessibility/types'
import { ReactProps, ShorthandValue } from '../../../types/utils'

export interface LabelProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  accessibility?: Accessibility

  /** A label can be circular. */
  circular?: boolean

  /** A Label can take the width of its container. */
  fluid?: boolean

  /** Label can have an icon. */
  icon?: ShorthandValue

  /** An icon label can format an Icon to appear before or after the text in the label */
  iconPosition?: 'start' | 'end'

  /** Label can have an image. */
  image?: ShorthandValue

  /** An icon label can format an Icon to appear before or after the text in the label */
  imagePosition?: 'start' | 'end'
}

/**
 * A label is used to classify content.
 */
class Label extends UIComponent<ReactProps<LabelProps>, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    ...commonPropTypes.createCommon(),
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

  renderComponent({ ElementType, classes, rest, variables, styles }) {
    const { children, content, icon, iconPosition, image, imagePosition } = this.props

    const imageElement =
      image &&
      Image.create(image, {
        defaultProps: {
          styles: styles.image,
          variables: variables.image,
        },
      })

    const iconElement =
      icon &&
      Icon.create(icon, {
        defaultProps: {
          styles: styles.icon,
          variables: variables.icon,
        },
        overrideProps: this.handleIconOverrides,
      })

    let start: React.ReactNode = null
    let end: React.ReactNode = null

    // Default positioning of the image and icon
    if (image && imagePosition === 'start') {
      start = imageElement
    }
    if (icon && iconPosition === 'end') {
      end = iconElement
    }

    // Custom positioning of the icon and image
    if (icon && iconPosition === 'start') {
      if (image && imagePosition === 'start') {
        start = (
          <React.Fragment>
            {imageElement}
            {iconElement}
          </React.Fragment>
        )
      } else {
        start = iconElement
      }
    }
    if (image && imagePosition === 'end') {
      if (icon && iconPosition === 'end') {
        end = (
          <React.Fragment>
            {iconElement}
            {imageElement}
          </React.Fragment>
        )
      } else {
        end = imageElement
      }
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? (
          children
        ) : (
          <Layout main={content} start={start} end={end} gap={pxToRem(3)} />
        )}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, 'content')

export default Label
