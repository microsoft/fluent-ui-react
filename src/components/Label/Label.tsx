import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createShorthandFactory,
  customPropTypes,
  pxToRem,
  UIComponent,
} from '../../lib'

import { Icon, Image, Layout } from '../..'
import { Accessibility } from '../../lib/accessibility/interfaces'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import { Extendable, ReactChildren, ItemShorthand } from '../../../types/utils'

export interface ILabelProps {
  accessibility?: Accessibility
  as?: any
  children?: ReactChildren
  circular?: boolean
  className?: string
  content?: React.ReactNode
  fluid?: boolean
  icon?: ItemShorthand
  iconPosition?: 'start' | 'end'
  image?: ItemShorthand
  imagePosition?: 'start' | 'end'
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
}

/**
 * A label displays content classification
 */
class Label extends UIComponent<Extendable<ILabelProps>, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A label can be circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Label can have an icon. */
    icon: customPropTypes.itemShorthand,

    /** An icon label can format an Icon to appear before or after the text in the label */
    iconPosition: PropTypes.oneOf(['start', 'end']),

    /** Label can have an icon. */
    image: customPropTypes.itemShorthand,

    /** An icon label can format an Icon to appear before or after the text in the label */
    imagePosition: PropTypes.oneOf(['start', 'end']),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
