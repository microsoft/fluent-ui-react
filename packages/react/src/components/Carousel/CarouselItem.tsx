import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'

import { Ref } from '@stardust-ui/react-component-ref'
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
import { WithAsProp, withSafeTypeForAs, ShorthandValue, ShorthandRenderFunction } from '../../types'
import CarouselSlide, { CarouselSlideProps } from './CarouselSlide'
import { carouselItemBehavior } from 'src/lib/accessibility'

export interface CarouselItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Whether or not the item is in view or not. */
  active?: boolean

  /** Ref for the item DOM element. */
  contentRef?: React.Ref<HTMLElement>

  /**
   * A custom render iterator for rendering each carousel slide.
   * The default component, props, and children are available for each carousel slide.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItemSlide?: ShorthandRenderFunction<CarouselSlideProps>

  /** Properties for CarouselSlide. */
  slide?: ShorthandValue<CarouselSlideProps>
}

class CarouselItem extends UIComponent<WithAsProp<CarouselItemProps>> {
  static create: ShorthandFactory<CarouselItemProps>

  static displayName = 'CarouselItem'

  static className = 'ui-carousel__item'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    active: PropTypes.bool,
    contentRef: customPropTypes.ref,
    renderItemSlide: PropTypes.func,
    slide: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'li',
    accessibility: carouselItemBehavior,
  }

  renderContent() {
    const { renderItemSlide, slide } = this.props

    return CarouselSlide.create(slide, { render: renderItemSlide })
  }

  renderComponent({ ElementType, classes, styles, accessibility, unhandledProps }) {
    const { children, contentRef } = this.props
    return (
      <Ref innerRef={contentRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          {childrenExist(children) ? children : this.renderContent()}
        </ElementType>
      </Ref>
    )
  }
}

CarouselItem.create = createShorthandFactory({ Component: CarouselItem, mappedProp: 'slide' })

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 */
export default withSafeTypeForAs<typeof CarouselItem, CarouselItemProps, 'li'>(CarouselItem)
