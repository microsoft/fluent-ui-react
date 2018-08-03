import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, UIComponent } from '../../lib'

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<any, any> {
  static className = 'ui-image'

  static displayName = 'Image'

  static handledProps = ['as', 'avatar', 'circular', 'className']

  static propTypes = {
    /**  */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    className: PropTypes.string,
  }

  static defaultProps = {
    as: 'img',
  }

  renderComponent({ ElementType, classes, rest }) {
    return <ElementType {...rest} className={classes.root} />
  }
}

export default Image
