import * as PropTypes from 'prop-types'
import * as React from 'react'

import { createShorthandFactory, UIComponent, UIComponentProps, commonPropTypes } from '../../lib'
import { imageBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/types'

import { ReactProps } from '../../../types/utils'

export interface ImageProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default imageBehavior
   * */
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
class Image extends UIComponent<ReactProps<ImageProps>, any> {
  static create: Function

  static className = 'ui-image'

  static displayName = 'Image'

  static propTypes = {
    ...commonPropTypes.createCommon({
      children: false,
      content: false,
    }),
    accessibility: PropTypes.func,
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

Image.create = createShorthandFactory(Image, 'src')

export default Image
