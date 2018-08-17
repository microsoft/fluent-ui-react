import * as PropTypes from 'prop-types'
import * as React from 'react'

import { customPropTypes, UIComponent } from '../../lib'
import { ImageBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'

export interface ImageProps {
  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean

  /** An image can appear circular. */
  circular?: boolean
}

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<ImageProps, any> {
  static className = 'ui-image'

  static displayName = 'Image'

  static handledProps = [
    'accessibility',
    'as',
    'avatar',
    'circular',
    'className',
    'fluid',
    'styles',
    'variables',
  ]

  static defaultProps = {
    as: 'img',
    accessibility: ImageBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    return <ElementType {...accessibility.attributes.root} {...rest} className={classes.root} />
  }
}

export default Image
