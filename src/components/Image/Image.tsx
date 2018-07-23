import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, UIComponent } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'
import { ImageBehavior } from '../../lib/accessibility/Behaviors/behaviors'

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<any, any> {
  static className = 'ui-image'

  static displayName = 'Image'

  static handledProps = ['as', 'avatar', 'circular', 'className']

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
  }

  static defaultProps = {
    as: 'img',
  }

  constructor(p, s) {
    super(p, s)

    this.accBehavior = new ImageBehavior()
  }

  renderComponent({ ElementType, classes, rest }) {
    return (
      <ElementType
        {...this.accBehavior.generateAriaAttributes(this.props, this.state)}
        {...rest}
        className={classes.root}
      />
    )
  }
}

export default Image
