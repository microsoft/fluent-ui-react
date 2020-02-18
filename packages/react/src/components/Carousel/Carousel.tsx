import * as customPropTypes from '@fluentui/react-proptypes'
import { Accessibility, carouselBehavior } from '@fluentui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import cx from 'classnames'
import { Ref } from '@fluentui/react-component-ref'
import Animation from '../Animation/Animation'

import {
  UIComponentProps,
  createShorthandFactory,
  ShorthandFactory,
  commonPropTypes,
  applyAccessibilityKeyHandlers,
  childrenExist,
  ChildrenComponentProps,
  getOrGenerateIdFromShorthand,
  AutoControlledComponent,
  isFromKeyboard,
} from '../../utils'
import {
  WithAsProp,
  withSafeTypeForAs,
  DebounceResultFn,
  ShorthandCollection,
  ShorthandValue,
  ComponentEventHandler,
} from '../../types'
import Button, { ButtonProps } from '../Button/Button'
import CarouselItem, { CarouselItemProps } from './CarouselItem'
import Text from '../Text/Text'
import CarouselNavigation, { CarouselNavigationProps } from './CarouselNavigation'
import CarouselNavigationItem, { CarouselNavigationItemProps } from './CarouselNavigationItem'

export interface CarouselSlotClassNames {
  itemsContainer: string
  paddleNext: string
  paddlePrevious: string
  pagination: string
  navigation: string
}

export interface CarouselProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available menuAsToolbarBehavior, tabListBehavior, tabBehavior
   */
  accessibility?: Accessibility

  /** Index of the currently active item. */
  activeIndex?: number | string

  /**
   * Sets the aria-roledescription attribute.
   */
  ariaRoleDescription?: string

  /** Specifies if the process of switching slides is circular. */
  circular?: boolean

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | string

  /**
   * Message generator for item position in the carousel. Used to generate the
   * text for pagination. Also generates invisible text content for each item
   * which is added along with the slide content. These are used by the screen
   * reader to narrate position when active item is changed.
   */
  getItemPositionText?: (index: number, size: number) => string

  /** Shorthand array of props for CarouselItem. */
  items?: ShorthandCollection<CarouselItemProps>

  /** Shorthand array of props for the buttons of the CarouselNavigation. */
  navigation?:
    | ShorthandValue<CarouselNavigationProps>
    | ShorthandCollection<CarouselNavigationItemProps>

  /**
   * A Carousel can position its navigation below the content by default,
   * above the content, to the start or to the end of the content.
   */
  navigationPosition?: 'below' | 'above' | 'start' | 'end'

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All Carousel props.
   */
  onActiveIndexChange?: ComponentEventHandler<CarouselProps>

  /** Shorthand for the paddle that navigates to the next item. */
  paddleNext?: ShorthandValue<ButtonProps>

  /**
   * A Carousel can position its paddels inside the content, outside or inline
   * with the navigation component.
   */
  paddlesPosition?: 'inside' | 'outside' | 'inline'

  /** Shorthand for the paddle that navigates to the previous item. */
  paddlePrevious?: ShorthandValue<ButtonProps>
}

export interface CarouselState {
  activeIndex: number
  prevActiveIndex: number
  ariaLiveOn: boolean
  itemIds: string[]
  shouldFocusContainer: boolean
  isFromKeyboard: boolean
}

class Carousel extends AutoControlledComponent<WithAsProp<CarouselProps>, CarouselState> {
  static create: ShorthandFactory<CarouselProps>

  static displayName = 'Carousel'

  static className = 'ui-carousel'

  static slotClassNames: CarouselSlotClassNames = {
    itemsContainer: `${Carousel.className}__itemscontainer`,
    paddleNext: `${Carousel.className}__paddlenext`,
    paddlePrevious: `${Carousel.className}__paddleprevious`,
    pagination: `${Carousel.className}__pagination`,
    navigation: `${Carousel.className}__navigation`,
  }

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ariaRoleDescription: PropTypes.string,
    circular: PropTypes.bool,
    defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    getItemPositionText: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    navigation: PropTypes.oneOfType([
      customPropTypes.collectionShorthand,
      customPropTypes.itemShorthand,
    ]),
    navigationPosition: PropTypes.string,
    onActiveIndexChange: PropTypes.func,
    paddleNext: customPropTypes.itemShorthand,
    paddlesPosition: PropTypes.string,
    paddlePrevious: customPropTypes.itemShorthand,
  }

  static autoControlledProps = ['activeIndex']

  static defaultProps = {
    accessibility: carouselBehavior as Accessibility,
    paddlePrevious: {},
    paddleNext: {},
  }

  static Item = CarouselItem
  static Navigation = CarouselNavigation
  static NavigationItem = CarouselNavigationItem

  static getAutoControlledStateFromProps(props: CarouselProps, state: CarouselState) {
    const { items } = props
    const { itemIds } = state

    if (!items) {
      return null
    }

    return {
      itemIds: items.map((item, index) =>
        getOrGenerateIdFromShorthand('carousel-item-', item, itemIds[index]),
      ),
    }
  }

  componentWillUnmount() {
    this.focusItemAtIndex.cancel()
  }

  actionHandlers = {
    showNextSlideByKeyboardNavigation: e => {
      e.preventDefault()
      this.showNextSlide(e, true)
    },
    showPreviousSlideByKeyboardNavigation: e => {
      e.preventDefault()
      this.showPreviousSlide(e, true)
    },
    showNextSlideByPaddlePress: e => {
      e.preventDefault()
      const { activeIndex } = this.state
      const { circular, items, navigation } = this.props

      this.showNextSlide(e, false)

      // if 'next' paddle will disappear, will focus 'previous' one.
      if (!navigation && activeIndex >= items.length - 2 && !circular) {
        this.paddlePreviousRef.current.focus()
      }
    },
    showPreviousSlideByPaddlePress: e => {
      e.preventDefault()
      const { activeIndex } = this.state
      const { circular, navigation } = this.props

      this.showPreviousSlide(e, false)

      // if 'previous' paddle will disappear, will focus 'next' one.
      if (!navigation && activeIndex <= 1 && !circular) {
        this.paddleNextRef.current.focus()
      }
    },
  }

  getInitialAutoControlledState(): CarouselState {
    return {
      activeIndex: 0,
      prevActiveIndex: -1,
      ariaLiveOn: false,
      itemIds: [] as string[],
      shouldFocusContainer: false,
      isFromKeyboard: false,
    }
  }

  itemRefs = [] as React.RefObject<HTMLElement>[]
  paddleNextRef = React.createRef<HTMLElement>()
  paddlePreviousRef = React.createRef<HTMLElement>()
  focusItemAtIndex: DebounceResultFn<(index: number) => void> = _.debounce((index: number) => {
    this.itemRefs[index].current.focus()
  }, 400)

  setActiveIndex(e: React.SyntheticEvent, index: number, focusItem: boolean): void {
    const { circular, items } = this.props
    const lastItemIndex = items.length - 1
    let activeIndex = index

    if (index < 0) {
      if (!circular) {
        return
      }
      activeIndex = lastItemIndex
    }

    if (index > lastItemIndex) {
      if (!circular) {
        return
      }
      activeIndex = 0
    }

    this.setState({
      prevActiveIndex: this.state.activeIndex,
      activeIndex,
    })

    _.invoke(this.props, 'onActiveIndexChange', e, this.props)

    if (focusItem) {
      this.focusItemAtIndex(activeIndex)
    }
  }

  overrideItemProps = predefinedProps => ({
    onFocus: (e, itemProps) => {
      this.setState({
        shouldFocusContainer: e.currentTarget === e.target,
        isFromKeyboard: isFromKeyboard(),
      })
      _.invoke(predefinedProps, 'onFocus', e, itemProps)
    },
    onBlur: (e, itemProps) => {
      this.setState({
        shouldFocusContainer: e.currentTarget.contains(e.relatedTarget),
        isFromKeyboard: false,
      })
      _.invoke(predefinedProps, 'onBlur', e, itemProps)
    },
  })

  renderContent = (accessibility, classes, unhandledProps) => {
    const { ariaRoleDescription, getItemPositionText, items, circular } = this.props
    const { activeIndex, itemIds, prevActiveIndex } = this.state

    this.itemRefs = []

    return (
      <div
        className={classes.itemsContainerWrapper}
        {...accessibility.attributes.itemsContainerWrapper}
      >
        <div
          className={cx(Carousel.slotClassNames.itemsContainer, classes.itemsContainer)}
          aria-roledescription={ariaRoleDescription}
          {...accessibility.attributes.itemsContainer}
          {...applyAccessibilityKeyHandlers(
            accessibility.keyHandlers.itemsContainer,
            unhandledProps,
          )}
        >
          {items &&
            items.map((item, index) => {
              const itemRef = React.createRef<HTMLElement>()
              this.itemRefs.push(itemRef)
              const active = activeIndex === index
              let slideToNext = prevActiveIndex < activeIndex

              const initialMounting = prevActiveIndex === -1

              if (circular && prevActiveIndex === items.length - 1 && activeIndex === 0) {
                slideToNext = true
              } else if (circular && prevActiveIndex === 0 && activeIndex === items.length - 1) {
                slideToNext = false
              }

              return (
                <Animation
                  key={item['key'] || index}
                  mountOnEnter
                  unmountOnExit
                  visible={active}
                  name={
                    initialMounting
                      ? ''
                      : active
                      ? slideToNext
                        ? 'carousel-slide-to-next-enter'
                        : 'carousel-slide-to-previous-enter'
                      : slideToNext
                      ? 'carousel-slide-to-next-exit'
                      : 'carousel-slide-to-previous-exit'
                  }
                >
                  <Ref innerRef={itemRef}>
                    {CarouselItem.create(item, {
                      defaultProps: () => ({
                        active,
                        id: itemIds[index],
                        navigation: !!this.props.navigation,
                        ...(getItemPositionText && {
                          itemPositionText: getItemPositionText(index, items.length),
                        }),
                      }),
                      overrideProps: this.overrideItemProps,
                    })}
                  </Ref>
                </Animation>
              )
            })}
        </div>
      </div>
    )
  }

  showPreviousSlide = (e: React.SyntheticEvent, focusItem: boolean) => {
    this.setActiveIndex(e, this.state.activeIndex - 1, focusItem)
  }

  showNextSlide = (e: React.SyntheticEvent, focusItem: boolean) => {
    this.setActiveIndex(e, this.state.activeIndex + 1, focusItem)
  }

  handlePaddleOverrides = (predefinedProps: ButtonProps, paddleName: string) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      if (paddleName === 'paddleNext') {
        this.showNextSlide(e, false)
      } else if (paddleName === 'paddlePrevious') {
        this.showPreviousSlide(e, false)
      }
    },
    onBlur: (e: React.FocusEvent, buttonProps: ButtonProps) => {
      if (e.relatedTarget !== this.paddleNextRef.current) {
        this.setState({ ariaLiveOn: false })
      }
    },
    onFocus: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onFocus', e, buttonProps)
      this.setState({
        ariaLiveOn: true,
      })
    },
  })

  renderPaddles = (accessibility, styles) => {
    const { paddlePrevious, paddleNext } = this.props

    return (
      <>
        <Ref innerRef={this.paddlePreviousRef}>
          {Button.create(paddlePrevious, {
            defaultProps: () => ({
              className: Carousel.slotClassNames.paddlePrevious,
              iconOnly: true,
              icon: 'icon-chevron-start',
              styles: styles.paddlePrevious,
              ...accessibility.attributes.paddlePrevious,
              ...applyAccessibilityKeyHandlers(
                accessibility.keyHandlers.paddlePrevious,
                paddlePrevious,
              ),
            }),
            overrideProps: (predefinedProps: ButtonProps) =>
              this.handlePaddleOverrides(predefinedProps, 'paddlePrevious'),
          })}
        </Ref>
        <Ref innerRef={this.paddleNextRef}>
          {Button.create(paddleNext, {
            defaultProps: () => ({
              className: Carousel.slotClassNames.paddleNext,
              iconOnly: true,
              icon: 'icon-chevron-end',
              styles: styles.paddleNext,
              ...accessibility.attributes.paddleNext,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.paddleNext, paddleNext),
            }),
            overrideProps: (predefinedProps: ButtonProps) =>
              this.handlePaddleOverrides(predefinedProps, 'paddleNext'),
          })}
        </Ref>
      </>
    )
  }

  renderNavigation = () => {
    const { getItemPositionText, navigation, items } = this.props

    if (!items || !items.length) {
      return null
    }

    const { activeIndex } = this.state

    return navigation ? (
      CarouselNavigation.create(navigation, {
        defaultProps: () => ({
          className: Carousel.slotClassNames.navigation,
          iconOnly: true,
          activeIndex,
        }),
        overrideProps: (predefinedProps: CarouselNavigationItemProps) => ({
          onItemClick: (e: React.SyntheticEvent, itemProps: CarouselNavigationItemProps) => {
            const { index } = itemProps

            this.setActiveIndex(e, index, true)

            _.invoke(predefinedProps, 'onClick', e, itemProps)
          },
        }),
      })
    ) : (
      <Text
        className={Carousel.slotClassNames.pagination}
        content={getItemPositionText(activeIndex, items.length)}
      />
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
            {this.renderContent(accessibility, classes, unhandledProps)}
            {this.renderPaddles(accessibility, styles)}
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
 * @accessibilityIssues
 * [VoiceOver doens't narrate label referenced by aria-labelledby attribute, when role is "tabpanel"](https://bugs.chromium.org/p/chromium/issues/detail?id=1040924)
 */
export default withSafeTypeForAs<typeof Carousel, CarouselProps, 'div'>(Carousel)
