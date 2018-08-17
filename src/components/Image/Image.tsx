import * as PropTypes from 'prop-types'
import * as React from 'react'

import { customPropTypes, UIComponent } from '../../lib'
import imageStyles from '../../themes/teams/components/Image/imageStyles'
import imageVariables from '../../themes/teams/components/Image/imageVariables'
import { ImageBehavior } from '../../lib/accessibility'

/**
 * An image is a graphic representation of something.
 * @accessibility
 * Default behavior: ImageBehavior
 *  - attribute "aria-hidden='true'" is applied on img tag, if there is no 'alt' attribute provided
 *
 * If image should be visible to screen readers, then it has to have 'alt' attribute specified.
 *
 * Other considerations:
 *  - when alt attribute is empty, then Narrator in scan mode navigate to image and narrate it as empty paragraph
 *  - when image has role='presentation' then screen readers navigate to the element in scan/virtual mode. To avoid it the attribute "aria-hidden='true'" should be used
 *  - when image is visible for screen reader and contains another attribute as aria-label/arialabbeledby/title, then do additional screen readers verification.
 *    As each reader can narrate alt attribute + aria attribute + title a bit diffrently.
 */
class Image extends UIComponent<any, any> {
  static className = 'ui-image'

  static displayName = 'Image'

  static styles = imageStyles

  static variables = imageVariables

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
  }

  static handledProps = ['accessibility', 'as', 'avatar', 'circular', 'className', 'fluid']

  static defaultProps = {
    as: 'img',
    accessibility: ImageBehavior,
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    return <ElementType {...accessibility.attributes.root} {...rest} className={classes.root} />
  }
}

export default Image
