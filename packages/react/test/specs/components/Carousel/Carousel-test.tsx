import * as React from 'react'

import { isConformant } from 'test/specs/commonTests'
import Carousel, { CarouselProps } from 'src/components/Carousel/Carousel'
import CarouselItem from 'src/components/Carousel/CarouselItem'
import CarouselNavigation from 'src/components/Carousel/CarouselNavigation'
import CarouselNavigationItem from 'src/components/Carousel/CarouselNavigationItem'
import Text from 'src/components/Text/Text'
import { ReactWrapper, CommonWrapper } from 'enzyme'
import { findIntrinsicElement, mountWithProvider } from 'test/utils'

const items = [
  {
    key: 'item1',
    id: 'item1',
    content: <Text content={'item1'} />,
  },
  {
    key: 'item2',
    id: 'item2',
    content: <Text content={'item2'} />,
  },
  {
    key: 'item3',
    id: 'item3',
    content: <Text content={'item3'} />,
  },
  {
    key: 'item4',
    id: 'item4',
    content: <Text content={'item4'} />,
  },
]

function renderCarousel(props?: CarouselProps): ReactWrapper {
  return mountWithProvider(
    <Carousel
      items={items}
      getItemPositionText={(index: number, length: number) => `${index + 1} of ${length}`}
      {...props}
    />,
  )
}

const getItemsContainer = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Carousel.slotClassNames.itemsContainer}`)
const getPaddleNextWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Carousel.slotClassNames.paddleNext}`)
const getPaddlePreviousWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Carousel.slotClassNames.paddlePrevious}`)
const getPaginationWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Carousel.slotClassNames.pagination}`)
const getNavigationNavigationWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${CarouselNavigation.className}`)
const getNavigationNavigationItemAtIndexWrapper = (
  wrapper: ReactWrapper,
  index: number,
): CommonWrapper => findIntrinsicElement(wrapper, `.${CarouselNavigationItem.className}`).at(index)
const getItemAtIndexWrapper = (wrapper: ReactWrapper, index: number): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${CarouselItem.className}`).at(index)

jest.useFakeTimers()

describe('Carousel', () => {
  isConformant(Carousel)

  describe('activeIndex', () => {
    it('should increase at paddle next press', () => {
      const wrapper = renderCarousel()
      const paddleNext = getPaddleNextWrapper(wrapper)
      const pagination = getPaginationWrapper(wrapper)

      paddleNext.simulate('click')

      expect(pagination.getDOMNode().textContent).toBe(`2 of ${items.length}`)
    })

    it('should decrese at paddle previous press', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3 })
      const paddlePrevious = getPaddlePreviousWrapper(wrapper)
      const pagination = getPaginationWrapper(wrapper)

      paddlePrevious.simulate('click')

      expect(pagination.getDOMNode().textContent).toBe(`3 of ${items.length}`)
    })

    it('should not increase at paddle next press if last and not circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3 })
      const paddleNext = getPaddleNextWrapper(wrapper)
      const pagination = getPaginationWrapper(wrapper)

      paddleNext.simulate('click')

      expect(pagination.getDOMNode().textContent).toBe(`4 of ${items.length}`)
    })

    it('should not decrese at paddle previous press if first and not circular', () => {
      const wrapper = renderCarousel()
      const paddlePrevious = getPaddlePreviousWrapper(wrapper)
      const pagination = getPaginationWrapper(wrapper)

      paddlePrevious.simulate('click')

      expect(pagination.getDOMNode().textContent).toBe(`1 of ${items.length}`)
    })

    it('should wrap at paddle next press if last and circular', () => {
      const wrapper = renderCarousel({ circular: true, defaultActiveIndex: 3 })
      const paddleNext = getPaddleNextWrapper(wrapper)
      const pagination = getPaginationWrapper(wrapper)

      paddleNext.simulate('click')

      expect(pagination.getDOMNode().textContent).toBe(`1 of ${items.length}`)
    })

    it('should wrap at paddle previous press if first and circular', () => {
      const wrapper = renderCarousel({ circular: true })
      const paddlePrevious = getPaddlePreviousWrapper(wrapper)
      const pagination = getPaginationWrapper(wrapper)

      paddlePrevious.simulate('click')

      expect(pagination.getDOMNode().textContent).toBe(`4 of ${items.length}`)
    })

    it('should increment at arrow right', () => {
      const wrapper = renderCarousel({ circular: true })
      const pagination = getPaginationWrapper(wrapper)
      const itemsContainer = getItemsContainer(wrapper)

      itemsContainer.simulate('keydown', { key: 'ArrowRight' })

      expect(pagination.getDOMNode().textContent).toBe(`2 of ${items.length}`)
    })

    it('should decrement at arrow left', () => {
      const wrapper = renderCarousel({ circular: true, defaultActiveIndex: 3 })
      const pagination = getPaginationWrapper(wrapper)
      const itemsContainer = getItemsContainer(wrapper)

      itemsContainer.simulate('keydown', { key: 'ArrowLeft' })

      expect(pagination.getDOMNode().textContent).toBe(`3 of ${items.length}`)
    })
  })

  describe('paddle', () => {
    it('next should be hidden on last element if not circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3, circular: true })

      expect(!wrapper.exists(`.${Carousel.slotClassNames.paddleNext}`))
      expect(wrapper.exists(`.${Carousel.slotClassNames.paddlePrevious}`))
    })

    it('previous should be hidden on last element if not circular', () => {
      const wrapper = renderCarousel({ circular: true })

      expect(!wrapper.exists(`.${Carousel.slotClassNames.paddlePrevious}`))
      expect(wrapper.exists(`.${Carousel.slotClassNames.paddleNext}`))
    })

    it('next should not be hidden on last element if circular', () => {
      const wrapper = renderCarousel({ defaultActiveIndex: 3, circular: true })

      expect(wrapper.exists(`.${Carousel.slotClassNames.paddleNext}`))
      expect(wrapper.exists(`.${Carousel.slotClassNames.paddlePrevious}`))
    })

    it('previous should not be hidden on last element if circular', () => {
      const wrapper = renderCarousel({ circular: true })

      expect(wrapper.exists(`.${Carousel.slotClassNames.paddlePrevious}`))
      expect(wrapper.exists(`.${Carousel.slotClassNames.paddleNext}`))
    })
  })

  describe('navigation', () => {
    const navigation = {
      items: items.map(item => ({ key: item.key, icon: { name: 'stardust-circle' } })),
    }

    afterEach(() => {
      jest.runAllTimers()
    })

    it('should not show pagination if prop is passed', () => {
      const wrapper = renderCarousel({ navigation })
      const navigationWrapper = getNavigationNavigationWrapper(wrapper)
      const paginationWrapper = getPaginationWrapper(wrapper)

      expect(paginationWrapper.length).toBe(0)
      expect(navigationWrapper.getDOMNode().children.length).toBe(4)
    })

    it('should show and focus the appropriate slide when clicked', () => {
      const wrapper = renderCarousel({ navigation })
      const secondNavigationItemWrapper = getNavigationNavigationItemAtIndexWrapper(wrapper, 1)
      const secondItemWrapper = getItemAtIndexWrapper(wrapper, 1)

      secondNavigationItemWrapper.simulate('click')
      jest.runAllTimers()

      expect(wrapper.state('activeIndex')).toEqual(1)
      expect(document.activeElement).toEqual(secondItemWrapper.getDOMNode())
    })
  })
})
