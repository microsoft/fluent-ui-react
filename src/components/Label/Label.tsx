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

/**
 * A label displays content classification
 */
class Label extends UIComponent<any, any> {
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

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'icon',
    'iconPosition',
    'image',
    'imagePosition',
    'styles',
    'variables',
  ]

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
        defaultProps: { styles: { root: styles.image } },
        generateKey: false,
      })

    const iconElement =
      icon &&
      Icon.create(icon, {
        defaultProps: {
          styles: {
            root: styles.icon,
          },
          ...(!(icon.variables && icon.variables.color) && {
            variables: {
              color: variables.color,
            },
          }),
        },
        generateKey: false,
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
