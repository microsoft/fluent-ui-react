import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, customPropTypes, UIComponent } from '../../lib'
import { imageBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import { ComponentVariablesInput, ComponentSlotStyle } from '../../themes/types'
import { Extendable, ReactChildren } from '../../../types/utils'

export interface ImageProps {
  accessibility?: Accessibility
  as?: any
  avatar?: boolean
  children?: ReactChildren
  circular?: boolean
  className?: string
  fluid?: boolean
  css?: ComponentSlotStyle
  variables?: ComponentVariablesInput
}

/**
 * An image is a graphic representation of something.
 * @accessibility
 * If image should be visible to screen readers, textual representation needs to be provided in 'alt' property.
 *
 * Other considerations:
 *  - when alt property is empty, then Narrator in scan mode navigates to image and narrates it as empty paragraph
 *  - when image has role='presentation' then screen readers navigate to the element in scan/virtual mode. To avoid this, the attribute "aria-hidden='true'" is applied by the default image behavior
 *  - when alt property is used in combination with aria-label, arialabbeledby or title, additional screen readers verification is needed as each screen reader handles this combination differently.
 */
class Image extends UIComponent<Extendable<ImageProps>, any> {
  static create: Function

  static className = 'ui-image'

  static displayName = 'Image'

  static propTypes = {
    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,

    /** An element type to render as. */
    as: customPropTypes.as,

    /** An image may be formatted to appear inline with text as an avatar. */
    avatar: PropTypes.bool,

    /** An image can appear circular. */
    circular: PropTypes.bool,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** An image can take up the width of its container. */
    fluid: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    css: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'img',
    accessibility: imageBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    return <ElementType {...accessibility.attributes.root} {...rest} className={classes.root} />
  }
}

Image.create = createShorthandFactory(Image, src => ({ src }))

export default Image
