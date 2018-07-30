import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, UIComponent } from '../../lib'
import imageRules from './imageRules'
import imageVariables from './imageVariables'
import { A11yBehaviorType, A11yBehaviorFactory } from '../../lib/accessibility/A11yBehaviorFactory'

/**
 * An image is a graphic representation of something.
 */
class Image extends UIComponent<any, any> {
  static className = 'ui-image'

  static displayName = 'Image'

  static handledProps = ['as', 'avatar', 'circular', 'className', 'a11yType']

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

    a11yType: PropTypes.string,
  }

  static defaultProps = {
    as: 'img',
  }

  constructor(props, state) {
    super(props, state)
    const a11yType: string = props.a11yType
    this.accBehavior = A11yBehaviorFactory.createBehavior(
      A11yBehaviorType[a11yType] || A11yBehaviorType.image,
    )
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
