import * as React from 'react'
import * as PropTypes from 'prop-types'
import { carouselItemBehavior } from '@stardust-ui/accessibility'

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
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface CarouselItemSlotClassNames {
  itemPositionText: string
}

export interface CarouselItemProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps {
  /** Whether or not the item is in view or not. */
  active?: boolean

  /**
   * Text to be added in the DOM that will specify item position. To be picked
   * up by screen readers.
   */
  itemPositionText?: string
}

class CarouselItem extends UIComponent<WithAsProp<CarouselItemProps>> {
  static create: ShorthandFactory<CarouselItemProps>

  static displayName = 'CarouselItem'

  static className = 'ui-carousel__item'

  static propTypes = {
    ...commonPropTypes.createCommon(),
    active: PropTypes.bool,
    itemPositionText: PropTypes.string,
  }

  static defaultProps = {
    accessibility: carouselItemBehavior,
  }

  static slotClassNames: CarouselItemSlotClassNames = {
    itemPositionText: `${CarouselItem.className}__itemPositionText`,
  }

  renderComponent({ ElementType, classes, styles, accessibility, unhandledProps }) {
    const { children, content, itemPositionText } = this.props
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        <div
          className={CarouselItem.slotClassNames.itemPositionText}
          style={screenReaderContainerStyles}
        >
          {itemPositionText}
        </div>
        {childrenExist(children) ? children : content}
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
export default withSafeTypeForAs<typeof CarouselItem, CarouselItemProps, 'div'>(CarouselItem)
