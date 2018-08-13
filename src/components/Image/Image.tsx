import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { ImageBehavior } from '../../lib/accessibility'

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<any, any> {
  static create: Function

  static className = 'ui-image'

  static displayName = 'Image'

  static propTypes = {
    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

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

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

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
    accessibility: ImageBehavior,
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    return <ElementType {...accessibility.attributes.root} {...rest} className={classes.root} />
  }
}

Image.create = createShorthandFactory(Image, src => ({ src }))

export default Image
