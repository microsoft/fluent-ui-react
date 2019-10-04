import * as customPropTypes from '@stardust-ui/react-proptypes'
import { tabListBehavior, carouselBehavior } from '@stardust-ui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
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
  }

  state = {
    activeIndex: 0,
  }

  itemRefs: React.RefObject<HTMLElement>[] = []

  // focus after animation ends.
  focusItemAtIndex = _.debounce(index => {
    this.itemRefs[index].current.focus()
  }, 1000)

  setActiveIndex(index: number, setFocus = false): void {
    const { items } = this.props

    if (index < 0 || index >= items.length) {
      return
    }

    this.setState(
      {
        activeIndex: index,
      },
      () => {
        if (setFocus) {
          this.focusItemAtIndex(index)
        }
      },
    )
  }

  renderContent = (styles, accessibility, unhandledProps) => {
    const { items, renderItemSlide } = this.props
    const { activeIndex } = this.state

    if (!items) {
      return null
    }

    return (
      <div style={styles.itemsContainerWrapper}>
        <ul
          style={styles.itemsContainer}
          {...applyAccessibilityKeyHandlers(
            accessibility.keyHandlers.itemsContainer,
            unhandledProps,
          )}
        >
          {items.map((item, index) => {
            const contentRef = React.createRef<HTMLElement>()
            this.itemRefs[index] = contentRef

            return CarouselItem.create(item, {
              defaultProps: { renderItemSlide, active: activeIndex === index, contentRef },
            })
          })}
        </ul>
      </div>
    )
  }

  handlePrevious = (e: React.SyntheticEvent, setFocus?: boolean) => {
    this.setActiveIndex(this.state.activeIndex - 1, setFocus)
  }

  handleNext = (e: React.SyntheticEvent, setFocus?: boolean) => {
    this.setActiveIndex(this.state.activeIndex + 1, setFocus)
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
            // remove focus from tablist while animation.
            const activeElement: Element = this.context.target.activeElement
            if (activeElement instanceof HTMLElement) activeElement.blur()
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
            {this.renderContent(styles, accessibility, unhandledProps)}
            {this.renderControls(styles)}
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
