import { Accessibility, imageBehavior } from '@fluentui/accessibility'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  commonPropTypes,
  ShorthandFactory,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface ImageProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean

  /** An image can appear circular. */
  circular?: boolean

  /** An image can take up the width of its container. */
  fluid?: boolean

  /** Image source URL. */
  src?: string
}

class Image extends UIComponent<WithAsProp<ImageProps>, any> {
  static create: ShorthandFactory<ImageProps>

  static className = 'ui-image'

  static displayName = 'Image'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    avatar: PropTypes.bool,
    circular: PropTypes.bool,
    fluid: PropTypes.bool,
  }

  static defaultProps = {
    as: 'img',
    accessibility: imageBehavior as Accessibility,
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      />
    )
  }
}

Image.create = createShorthandFactory({ Component: Image, mappedProp: 'src', allowsJSX: false })

/**
 * An Image is a graphic representation of something.
 *
 * @accessibility
 * If image should be visible to screen readers, textual representation needs to be provided in 'alt' property.
 *
 * Other considerations:
 *  - when alt property is empty, then Narrator in scan mode navigates to image and narrates it as empty paragraph.
 *  - when image has role='presentation' then screen readers navigate to the element in scan/virtual mode. To avoid this, the attribute "aria-hidden='true'" is applied by the default image behavior.
 *  - when alt property is used in combination with aria-label, arialabbeledby or title, additional screen readers verification is needed as each screen reader handles this combination differently.
 */
export default withSafeTypeForAs<typeof Image, ImageProps, 'img'>(Image)
