import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as React from 'react'
import * as _ from 'lodash'
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
  buttonNext?: ShorthandValue<ButtonProps>
  buttonPrevious?: ShorthandValue<ButtonProps>
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
    buttonNext: customPropTypes.itemShorthandWithoutJSX,
    buttonPrevious: customPropTypes.itemShorthandWithoutJSX,
  }

  static defaultProps = {
    as: 'div',
    // accessibility: treeBehavior,
  }

  state = {
    activeIndex: 0,
  }

  renderContent = styles => {
    const { items } = this.props
    if (!items) {
      return null
    }
    return (
      <div style={styles.contentContainerWrapper}>
        <ul style={styles.contentContainer}>
          {items.map(item => (
            <li style={styles.itemContainer}>
              {Box.create(item, { defaultProps: { styles: styles.item } })}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  handlePrevious = (e: React.SyntheticEvent) => {
    this.setState(state => ({
      activeIndex: state.activeIndex > 0 ? state.activeIndex - 1 : 0,
    }))
  }

  handleNext = (e: React.SyntheticEvent) => {
    const { items } = this.props
    this.setState(state => ({
      activeIndex: state.activeIndex < items.length - 1 ? state.activeIndex + 1 : items.length - 1,
    }))
  }

  renderControls = styles => {
    const { buttonPrevious, buttonNext } = this.props

    return (
      <>
        {Button.create(buttonPrevious || {}, {
          defaultProps: {
            iconOnly: true,
            icon: 'stardust-chevron-left',
            styles: styles.buttonPrevious,
          },
          overrideProps: (predefinedProps: ButtonProps) => ({
            onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
              _.invoke(predefinedProps, 'onClick', e, buttonProps)
              this.handlePrevious(e)
            },
          }),
        })}
        {Button.create(buttonNext || {}, {
          defaultProps: {
            iconOnly: true,
            icon: 'stardust-chevron-right',
            styles: styles.buttonNext,
          },
          overrideProps: (predefinedProps: ButtonProps) => ({
            onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
              _.invoke(predefinedProps, 'onClick', e, buttonProps)
              this.handleNext(e)
            },
          }),
        })}
      </>
    )
  }

  renderNavigation = () => {
    return <ul />
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
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {this.renderContent(styles)}
            {this.renderControls(styles)}
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
