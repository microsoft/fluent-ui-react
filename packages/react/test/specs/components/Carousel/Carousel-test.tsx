import * as React from 'react'

import { isConformant } from 'test/specs/commonTests'
import Carousel, { CarouselProps } from 'src/components/Carousel/Carousel'
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

    it('should increase at arrow right', () => {
      const wrapper = renderCarousel({ circular: true })
      const pagination = getPaginationWrapper(wrapper)
      const itemsContainer = getItemsContainer(wrapper)

      itemsContainer.simulate('keydown', { key: 'ArrowRight' })

      expect(pagination.getDOMNode().textContent).toBe(`2 of ${items.length}`)
    })

    it('should decrease at arrow left', () => {
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
})
