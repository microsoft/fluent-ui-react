import * as React from 'react'
import * as PropTypes from 'prop-types'

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
import CarouselContent from './CarouselContent'

export interface CarouselItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Whether or not the item is in view or not. */
  active?: boolean
}

class CarouselItem extends UIComponent<WithAsProp<CarouselItemProps>> {
  static create: ShorthandFactory<CarouselItemProps>

  static displayName = 'CarouselItem'

  static className = 'ui-carousel__item'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
  }

  static defaultProps = {
    as: 'li',
    // accessibility: treeBehavior,
  }

  renderContent() {
    const { content } = this.props

    return CarouselContent.create(content)
  }

  renderComponent({ ElementType, classes, styles, accessibility, unhandledProps }) {
    const { children } = this.props
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? children : this.renderContent()}
      </ElementType>
    )
  }
}

CarouselItem.create = createShorthandFactory({ Component: CarouselItem, mappedProp: 'content' })

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 */
export default withSafeTypeForAs<typeof CarouselItem, CarouselItemProps, 'li'>(CarouselItem)
