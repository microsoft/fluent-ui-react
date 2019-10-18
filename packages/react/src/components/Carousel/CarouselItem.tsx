import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import { carouselItemBehavior } from '@stardust-ui/accessibility'
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
import { screenReaderContainerStyles } from '../../lib/accessibility/Styles/accessibilityStyles'
import { WithAsProp, withSafeTypeForAs, ShorthandValue, ShorthandRenderFunction } from '../../types'
import CarouselSlide, { CarouselSlideProps } from './CarouselSlide'

export interface CarouselItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Whether or not the item is in view or not. */
  active?: boolean

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
    renderItemSlide: PropTypes.func,
    slide: customPropTypes.itemShorthand,
  }

  static defaultProps = {
    as: 'div',
    accessibility: carouselItemBehavior,
  }

  contentRef = React.createRef<HTMLElement>()
  timeout = null

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) {
      this.timeout = setTimeout(() => {
        this.contentRef.current.focus()
      }, 400)
    } else if (prevProps.active && !this.props.active) {
      clearTimeout(this.timeout)
    }
  }

  renderContent() {
    const { renderItemSlide, slide } = this.props

    return CarouselSlide.create(slide, { render: renderItemSlide })
  }

  renderComponent({ ElementType, classes, styles, accessibility, unhandledProps }) {
    const { children } = this.props
    return (
      <Ref innerRef={this.contentRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.root}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
        >
          <div style={screenReaderContainerStyles}>{'blabla'}</div>
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
