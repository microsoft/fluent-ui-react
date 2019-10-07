import * as customPropTypes from '@stardust-ui/react-proptypes'
import { tabListBehavior, carouselBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import { Ref } from '@stardust-ui/react-component-ref'

import {
  UIComponentProps,
  UIComponent,
  createShorthandFactory,
  ShorthandFactory,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
  childrenExist,
  ChildrenComponentProps,
  SizeValue,
} from '../../lib'
import {
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  ShorthandValue,
  ShorthandRenderFunction,
} from '../../types'
import Button, { ButtonProps } from '../Button/Button'
import CarouselItem, { CarouselItemProps } from './CarouselItem'
import { CarouselSlideProps } from './CarouselSlide'
import Menu, { MenuProps } from '../Menu/Menu'
import Text from '../Text/Text'
import { MenuItemProps } from '../Menu/MenuItem'
import { screenReaderContainerStyles } from '../../lib/accessibility/Styles/accessibilityStyles'

export interface CarouselProps extends UIComponentProps, ChildrenComponentProps {
  /** Shorthand array of props for CarouselItem. */
  items?: ShorthandCollection<CarouselItemProps>

  /** Shorthand for the button that navigates to the next item. */
  buttonNext?: ShorthandValue<ButtonProps>

  /** Shorthand for the button that navigates to the previous item. */
  buttonPrevious?: ShorthandValue<ButtonProps>

  /**
   * A custom render iterator for rendering each carousel slide.
   * The default component, props, and children are available for each carousel slide.
   *
   * @param {React.ReactType} Component - The computed component for this slot.
   * @param {object} props - The computed props for this slot.
   * @param {ReactNode|ReactNodeArray} children - The computed children for this slot.
   */
  renderItemSlide?: ShorthandRenderFunction<CarouselSlideProps>

  /** Shorthand array of props for the buttons of the tabs navigation. */
  tabList?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>
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
    buttonNext: customPropTypes.itemShorthand,
    buttonPrevious: customPropTypes.itemShorthand,
    tabList: PropTypes.oneOfType([
      customPropTypes.collectionShorthand,
      customPropTypes.itemShorthand,
    ]),
  }

  static defaultProps = {
    accessibility: carouselBehavior,
    as: 'div',
    buttonPrevious: {},
    buttonNext: {},
    tabList: {},
  }

  actionHandlers = {
    moveNext: e => {
      e.preventDefault()
      this.handleNext(e)
    },
    movePrevious: e => {
      e.preventDefault()
      this.handlePrevious(e)
    },
  }

  state = {
    activeIndex: 0,
  }

  itemsContainerRef = React.createRef<HTMLElement>()

  setActiveIndex(index: number): void {
    const { items } = this.props

    if (index < 0 || index >= items.length) {
      return
    }

    this.setState({
      activeIndex: index,
    })
  }

  renderContent = (accessibility, styles, unhandledProps) => {
    const { items, renderItemSlide } = this.props
    const { activeIndex } = this.state

    if (!items) {
      return null
    }

    return (
      <div style={styles.itemsContainerWrapper} {...accessibility.attributes.itemsContainerWrapper}>
        <Ref innerRef={this.itemsContainerRef}>
          <div
            style={styles.itemsContainer}
            {...accessibility.attributes.itemsContainer}
            {...applyAccessibilityKeyHandlers(
              accessibility.keyHandlers.itemsContainer,
              unhandledProps,
            )}
          >
            {items.map((item, index) =>
              CarouselItem.create(item, {
                defaultProps: { renderItemSlide, active: activeIndex === index },
              }),
            )}
          </div>
        </Ref>
        <div {...accessibility.attributes.statusContainer} style={screenReaderContainerStyles}>
          {`${activeIndex + 1} of ${items.length}`}
        </div>
      </div>
    )
  }

  handlePrevious = (e: React.SyntheticEvent) => {
    this.setActiveIndex(this.state.activeIndex - 1)
  }

  handleNext = (e: React.SyntheticEvent) => {
    this.setActiveIndex(this.state.activeIndex + 1)
  }

  renderControls = (accessibility, styles) => {
    const { buttonPrevious, buttonNext } = this.props

    return (
      <>
        {Button.create(buttonPrevious, {
          defaultProps: {
            ...accessibility.attributes.buttonPrevious,
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
        {Button.create(buttonNext, {
          defaultProps: {
            ...accessibility.attributes.buttonNext,
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

  renderNavigation = styles => {
    const { tabList, items } = this.props

    if (!items || !items.length) {
      return null
    }

    const { activeIndex } = this.state
    return tabList ? (
      Menu.create(tabList, {
        defaultProps: {
          accessibility: tabListBehavior,
          iconOnly: true,
          activeIndex,
          styles: styles.navigationContainer,
          items: _.times(items.length, index => ({
            key: index,
            icon: { name: 'stardust-circle', size: 'smallest' as SizeValue },
          })),
        },
        overrideProps: (predefinedProps: MenuItemProps) => ({
          onItemClick: (e: React.SyntheticEvent, itemProps: MenuItemProps) => {
            const { index } = itemProps

            this.setActiveIndex(index)
            this.itemsContainerRef.current.focus()

            _.invoke(predefinedProps, 'onClick', e, itemProps)
          },
        }),
      })
    ) : (
      <Text content={`${activeIndex + 1} of ${items.length}`} />
    )
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
            {this.renderContent(accessibility, styles, unhandledProps)}
            {this.renderControls(accessibility, styles)}
            {this.renderNavigation(styles)}
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
