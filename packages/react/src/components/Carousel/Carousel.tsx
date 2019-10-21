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
  getOrGenerateIdFromShorthand,
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

export interface CarouselProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Sets the aria-roledescription attribute.
   */
  ariaRoleDescription?: string

  /** Shorthand for the button that navigates to the next item. */
  buttonNext?: ShorthandValue<ButtonProps>

  /** Shorthand for the button that navigates to the previous item. */
  buttonPrevious?: ShorthandValue<ButtonProps>

  /** Message generator for item position in the carousel. Used to generate
   * individual i11y messages for items, such as "1 of 4".
   */
  getItemPositionText?: (index: number, size: number) => string

  /** Shorthand array of props for CarouselItem. */
  items?: ShorthandCollection<CarouselItemProps>

  /** Specifies if the process of switching slides is cyclical. */
  cyclical?: boolean

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
  ariaLiveOn: boolean
  itemIds: string[]
}

class Carousel extends UIComponent<WithAsProp<CarouselProps>, CarouselState> {
  static create: ShorthandFactory<CarouselProps>

  static displayName = 'Carousel'

  static className = 'ui-carousel'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    ariaRoleDescription: PropTypes.string,
    buttonNext: customPropTypes.itemShorthand,
    buttonPrevious: customPropTypes.itemShorthand,
    cyclical: PropTypes.bool,
    getItemPositionText: PropTypes.func,
    items: customPropTypes.collectionShorthand,
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
      this.handleNext(e, true)
    },
    movePrevious: e => {
      e.preventDefault()
      this.handlePrevious(e, true)
    },
    moveNextAndFocusContainerIfLast: e => {
      e.preventDefault()
      const { activeIndex } = this.state
      const { cyclical, items, tabList } = this.props

      this.setState({
        ariaLiveOn: true,
      })

      this.handleNext(e, false)

      if (!tabList && activeIndex >= items.length - 2 && !cyclical) {
        this.buttonPreviousRef.current.focus()
      }
    },
    movePreviousAndFocusContainerIfFirst: e => {
      e.preventDefault()
      const { activeIndex } = this.state
      const { cyclical, tabList } = this.props

      this.setState({
        ariaLiveOn: true,
      })

      this.handlePrevious(e, false)

      if (!tabList && activeIndex <= 1 && !cyclical) {
        this.buttonNextRef.current.focus()
      }
    },
  }

  state = {
    activeIndex: 0,
    ariaLiveOn: false,
    itemIds: [] as string[],
  }

  static getDerivedStateFromProps(props: CarouselProps, state: CarouselState) {
    const { items } = props
    const { itemIds } = state

    return {
      itemIds: items.map((item, index) =>
        getOrGenerateIdFromShorthand('carousel-slide-', item, itemIds[index]),
      ),
    }
  }

  itemRefs = [] as React.RefObject<HTMLElement>[]
  buttonNextRef = React.createRef<HTMLElement>()
  buttonPreviousRef = React.createRef<HTMLElement>()

  focusItemAtIndex = _.debounce((index: number) => {
    this.itemRefs[index].current.focus()
  }, 400)

  setActiveIndex(index: number, focusItem: boolean): void {
    const { cyclical, items } = this.props
    const lastItemIndex = items.length - 1
    let activeIndex = index

    if (index < 0) {
      if (!cyclical) {
        return
      }
      activeIndex = lastItemIndex
    }

    if (index > lastItemIndex) {
      if (!cyclical) {
        return
      }
      activeIndex = 0
    }

    this.setState({
      activeIndex,
    })

    if (focusItem) {
      this.focusItemAtIndex(activeIndex)
    }
  }

  renderContent = (accessibility, styles, unhandledProps) => {
    const { ariaRoleDescription, getItemPositionText, items, renderItemSlide } = this.props
    const { activeIndex, itemIds } = this.state

    if (!items) {
      return null
    }

    this.itemRefs = []

    return (
      <div style={styles.itemsContainerWrapper} {...accessibility.attributes.itemsContainerWrapper}>
        <div
          aria-roledescription={ariaRoleDescription}
          style={styles.itemsContainer}
          {...accessibility.attributes.itemsContainer}
          {...applyAccessibilityKeyHandlers(
            accessibility.keyHandlers.itemsContainer,
            unhandledProps,
          )}
        >
          {items.map((item, index) => {
            const itemRef = React.createRef<HTMLElement>()
            this.itemRefs.push(itemRef)
            return (
              <Ref innerRef={itemRef}>
                {CarouselItem.create(item, {
                  defaultProps: {
                    renderItemSlide,
                    active: activeIndex === index,
                    id: itemIds[index],
                    ...(getItemPositionText && {
                      itemPositionText: getItemPositionText(index, items.length),
                    }),
                  },
                })}
              </Ref>
            )
          })}
        </div>
      </div>
    )
  }

  handlePrevious = (e: React.SyntheticEvent, focusItem: boolean) => {
    this.setActiveIndex(this.state.activeIndex - 1, focusItem)
  }

  handleNext = (e: React.SyntheticEvent, focusItem: boolean) => {
    this.setActiveIndex(this.state.activeIndex + 1, focusItem)
  }

  renderControls = (accessibility, styles) => {
    const { buttonPrevious, buttonNext } = this.props

    return (
      <>
        <Ref innerRef={this.buttonPreviousRef}>
          {Button.create(buttonPrevious, {
            defaultProps: {
              ...accessibility.attributes.buttonPrevious,
              iconOnly: true,
              icon: 'stardust-chevron-left',
              styles: styles.buttonPrevious,
              ...applyAccessibilityKeyHandlers(
                accessibility.keyHandlers.buttonPrevious,
                buttonPrevious,
              ),
            },
            overrideProps: (predefinedProps: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                this.handlePrevious(e, false)
              },
              onBlur: (e: React.FocusEvent, buttonProps: ButtonProps) => {
                if (e.relatedTarget !== this.buttonNextRef.current) {
                  this.setState({ ariaLiveOn: false })
                }
              },
              onFocus: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onFocus', e, buttonProps)
                this.setState({
                  ariaLiveOn: true,
                })
              },
            }),
          })}
        </Ref>
        <Ref innerRef={this.buttonNextRef}>
          {Button.create(buttonNext, {
            defaultProps: {
              ...accessibility.attributes.buttonNext,
              iconOnly: true,
              icon: 'stardust-chevron-right',
              styles: styles.buttonNext,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.buttonNext, buttonNext),
            },
            overrideProps: (predefinedProps: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                this.handleNext(e, false)
              },
              onBlur: (e: React.FocusEvent, buttonProps: ButtonProps) => {
                if (e.relatedTarget !== this.buttonPreviousRef.current) {
                  this.setState({ ariaLiveOn: false })
                }
              },
              onFocus: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onFocus', e, buttonProps)
                this.setState({
                  ariaLiveOn: true,
                })
              },
            }),
          })}
        </Ref>
      </>
    )
  }

  renderNavigation = styles => {
    const { tabList, items } = this.props

    if (!items || !items.length) {
      return null
    }

    const { activeIndex, itemIds } = this.state

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
            'aria-controls': itemIds[index],
          })),
        },
        overrideProps: (predefinedProps: MenuItemProps) => ({
          onItemClick: (e: React.SyntheticEvent, itemProps: MenuItemProps) => {
            const { index } = itemProps

            this.setActiveIndex(index, true)

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
