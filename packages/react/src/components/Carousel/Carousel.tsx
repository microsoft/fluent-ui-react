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
import { WithAsProp, withSafeTypeForAs, ShorthandCollection, ShorthandValue } from '../../types'
import Button, { ButtonProps } from '../Button/Button'
import CarouselItem, { CarouselItemProps } from './CarouselItem'
import Menu, { MenuProps } from '../Menu/Menu'
import Text from '../Text/Text'
import { MenuItemProps } from '../Menu/MenuItem'

export interface CarouselProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Sets the aria-roledescription attribute.
   */
  ariaRoleDescription?: string

  /** Specifies if the process of switching slides is cyclical. */
  cyclical?: boolean

  /**
   * Message generator for item position in the carousel. Used to generate
   * individual i11y messages for items, such as "1 of 4".
   */
  getItemPositionText?: (index: number, size: number) => string

  /** Shorthand array of props for CarouselItem. */
  items?: ShorthandCollection<CarouselItemProps>

  /**
   * A Carousel can position its navigation to the bottom by default,
   * to the top, to the left or to the right of the content.
   */
  navigationPosition?: 'bottom' | 'top' | 'left' | 'right'

  /** A Carousel's paddles may fade away when mouse is not hovering the code. */
  paddlesFade?: boolean

  /** Shorthand for the button that navigates to the next item. */
  paddleNext?: ShorthandValue<ButtonProps>

  /**
   * A Carousel can position its paddels inside the content, outside or inline
   * with the navigation component.
   */
  paddlesPosition?: 'inside' | 'outside' | 'inline'

  /** Shorthand for the button that navigates to the previous item. */
  paddlePrevious?: ShorthandValue<ButtonProps>

  /**
   * On slide transition, the Carousel may translate the slides' position,
   * fade their appearance or just hide and show without any animation.
   */
  slideTransition?: 'translate' | 'fade' | 'display'

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
    cyclical: PropTypes.bool,
    getItemPositionText: PropTypes.func,
    items: customPropTypes.collectionShorthand,
    paddleNext: customPropTypes.itemShorthand,
    paddlePrevious: customPropTypes.itemShorthand,
    tabList: PropTypes.oneOfType([
      customPropTypes.collectionShorthand,
      customPropTypes.itemShorthand,
    ]),
  }

  static defaultProps = {
    accessibility: carouselBehavior,
    as: 'div',
    paddlePrevious: {},
    paddleNext: {},
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

      this.handleNext(e, false)

      if (!tabList && activeIndex >= items.length - 2 && !cyclical) {
        this.paddlePreviousRef.current.focus()
      }
    },
    movePreviousAndFocusContainerIfFirst: e => {
      e.preventDefault()
      const { activeIndex } = this.state
      const { cyclical, tabList } = this.props

      this.handlePrevious(e, false)

      if (!tabList && activeIndex <= 1 && !cyclical) {
        this.paddleNextRef.current.focus()
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
  paddleNextRef = React.createRef<HTMLElement>()
  paddlePreviousRef = React.createRef<HTMLElement>()

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
    const { ariaRoleDescription, getItemPositionText, items } = this.props
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
    const { paddlePrevious, paddleNext } = this.props

    return (
      <>
        <Ref innerRef={this.paddlePreviousRef}>
          {Button.create(paddlePrevious, {
            defaultProps: {
              ...accessibility.attributes.paddlePrevious,
              iconOnly: true,
              icon: 'stardust-chevron-left',
              styles: styles.paddlePrevious,
              ...applyAccessibilityKeyHandlers(
                accessibility.keyHandlers.paddlePrevious,
                paddlePrevious,
              ),
            },
            overrideProps: (predefinedProps: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                this.handlePrevious(e, false)
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
            }),
          })}
        </Ref>
        <Ref innerRef={this.paddleNextRef}>
          {Button.create(paddleNext, {
            defaultProps: {
              ...accessibility.attributes.paddleNext,
              iconOnly: true,
              icon: 'stardust-chevron-right',
              styles: styles.paddleNext,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.paddleNext, paddleNext),
            },
            overrideProps: (predefinedProps: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps)
                this.handleNext(e, false)
              },
              onBlur: (e: React.FocusEvent, buttonProps: ButtonProps) => {
                if (e.relatedTarget !== this.paddlePreviousRef.current) {
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
