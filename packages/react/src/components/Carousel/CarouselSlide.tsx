import * as React from 'react'

import {
  UIComponent,
  commonPropTypes,
  UIComponentProps,
  ShorthandFactory,
  applyAccessibilityKeyHandlers,
  childrenExist,
  createShorthandFactory,
  ContentComponentProps,
  ChildrenComponentProps,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface CarouselSlideProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {}

class CarouselSlide extends UIComponent<WithAsProp<CarouselSlideProps>> {
  static create: ShorthandFactory<CarouselSlideProps>

  static displayName = 'CarouselSlide'

  static className = 'ui-carousel__slide'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  static defaultProps = {
    as: 'div',
  }

  renderComponent({ ElementType, classes, styles, accessibility, unhandledProps }) {
    const { children, content } = this.props
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

CarouselSlide.create = createShorthandFactory({
  Component: CarouselSlide,
  mappedProp: 'content',
})

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 */
export default withSafeTypeForAs<typeof CarouselSlide, CarouselSlideProps, 'div'>(CarouselSlide)
