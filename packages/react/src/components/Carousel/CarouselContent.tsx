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

export interface CarouselContentProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {}

class CarouselContent extends UIComponent<WithAsProp<CarouselContentProps>> {
  static create: ShorthandFactory<CarouselContentProps>

  static displayName = 'CarouselContent'

  static className = 'ui-carousel__content'

  static propTypes = {
    ...commonPropTypes.createCommon(),
  }

  static defaultProps = {
    as: 'div',
    // accessibility: treeBehavior,
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

CarouselContent.create = createShorthandFactory({
  Component: CarouselContent,
  mappedProp: 'content',
})

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 */
export default withSafeTypeForAs<typeof CarouselContent, CarouselContentProps, 'div'>(
  CarouselContent,
)
