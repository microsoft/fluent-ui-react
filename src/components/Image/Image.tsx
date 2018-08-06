import * as PropTypes from 'prop-types'
import * as React from 'react'

import { customPropTypes, UIComponent } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'
import { ImageBehavior } from '../../lib/accessibility'

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<any, any> {
  static className = 'ui-image'

  static displayName = 'Image'

  static handledProps = ['accessibility', 'as', 'avatar', 'circular', 'className']

  static rules = imageRules

  static variables = imageVariables

  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    className: PropTypes.string,

    /** Accessibility behavior if overriden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'img',
    //    accessibility: ImageBehavior,
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    return <ElementType {...accessibility.attributes.root} {...rest} className={classes.root} />
  }
}

export default Image
