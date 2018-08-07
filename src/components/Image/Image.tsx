import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<any, any> {
  static create: Function

  static className = 'ui-image'

  static displayName = 'Image'

  static rules = imageRules

  static variables = imageVariables

  static propTypes = {
    /** An element type to render as. */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** An image can take up the width of its container. */
    fluid: PropTypes.bool,
  }

  static handledProps = ['as', 'avatar', 'circular', 'className', 'fluid']

  static defaultProps = {
    as: 'img',
  }

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType {...rest} className={classes.root} />
  }
}

Image.create = createShorthandFactory(Image, src => ({ src }))

export default Image
