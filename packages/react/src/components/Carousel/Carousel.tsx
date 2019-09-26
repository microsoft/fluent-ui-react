import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import {
  UIComponentProps,
  UIComponent,
  createShorthandFactory,
  ShorthandFactory,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
  childrenExist,
  ChildrenComponentProps,
} from '../../lib'
import { WithAsProp, withSafeTypeForAs, ShorthandCollection, ShorthandValue } from '../../types'
import Box, { BoxProps } from '../Box/Box'
import Button, { ButtonProps } from '../Button/Button'

export interface CarouselProps extends UIComponentProps, ChildrenComponentProps {
  /** Shorthand array of props for ListItem. */
  items?: ShorthandCollection<BoxProps>
  nextButton?: ShorthandValue<ButtonProps>
  previousButton?: ShorthandValue<ButtonProps>
}

export interface CarouselState {
  activeIndex: number
}

class Carousel extends UIComponent<WithAsProp<CarouselProps>, CarouselState> {
  static create: ShorthandFactory<CarouselProps>

  static displayName = 'Carousel'

  static className = 'ui-carousel'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    items: customPropTypes.collectionShorthand,
    nextButton: customPropTypes.itemShorthandWithoutJSX,
    previousButton: customPropTypes.itemShorthandWithoutJSX,
  }

  static defaultProps = {
    as: 'div',
    // accessibility: treeBehavior,
  }

  state = {
    activeIndex: 0,
  }

  renderContent() {
    const { items } = this.props
    if (!items) {
      return null
    }
    return (
      <ul>
        {items.map(item => (
          <li>{Box.create(item)}</li>
        ))}
      </ul>
    )
  }

  renderControls() {
    const { previousButton, nextButton } = this.props

    return (
      <ul>
        {Button.create(previousButton || {}, {
          defaultProps: {
            iconOnly: true,
            icon: 'stardust-chevron-left',
          },
        })}
        {Button.create(nextButton || {}, {
          defaultProps: {
            iconOnly: true,
            icon: 'stardust-chevron-right',
          },
        })}
      </ul>
    )
  }

  renderNavigation() {
    return <ul />
  }

  renderComponent({ ElementType, classes, accessibility, unhandledProps }) {
    const { children } = this.props
    return (
      <ElementType
        className={classes.root}
        {...accessibility.attributes.root}
        {...unhandledProps}
        {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.root, unhandledProps)}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {this.renderContent()}
            {this.renderControls()}
            {this.renderNavigation()}
          </>
        )}
      </ElementType>
    )
  }
}

Carousel.create = createShorthandFactory({
  Component: Carousel,
  mappedArrayProp: 'items',
})

/**
 * A Carousel displays data organised as a gallery.
 *
 * @accessibility
 * Implements [ARIA Carousel](https://www.w3.org/WAI/tutorials/carousels/structure/) design pattern.
 */
export default withSafeTypeForAs<typeof Carousel, CarouselProps, 'div'>(Carousel)
