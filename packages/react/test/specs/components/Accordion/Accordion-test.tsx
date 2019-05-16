import * as React from 'react'

import Accordion from 'src/components/Accordion/Accordion'
import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider, mountWithProviderAndGetComponent } from 'test/utils'
import AccordionTitle from 'src/components/Accordion/AccordionTitle'
import { ReactWrapper, CommonWrapper } from 'enzyme'

const panels = [
  {
    key: 'one',
    title: 'One',
    content: '2 3 4',
  },
  {
    key: 'two',
    title: 'Five',
    content: '6 7 8 9',
  },
  {
    key: 'three',
    title: "What's next?",
    content: '10',
  },
]

const getTitleAtIndex = (wrapper: ReactWrapper, index: number): CommonWrapper => {
  return wrapper
    .find(`.${AccordionTitle.className}`)
    .filterWhere(n => typeof n.type() === 'string')
    .at(index)
}

describe('Accordion', () => {
  isConformant(Accordion)

  describe('activeIndex', () => {
    it('is -1 by default in an exclusive accordion', () => {
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} exclusive />,
      )
      expect(accordion.state('activeIndex')).toBe(-1)
    })

    it('is [-1] by default in an non-exclusive accordion', () => {
      const accordion = mountWithProviderAndGetComponent(Accordion, <Accordion panels={panels} />)
      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([-1]))
    })

    it('is 0 by default in an exclusive expanded accordion', () => {
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} exclusive expanded />,
      )
      expect(accordion.state('activeIndex')).toBe(0)
    })

    it('is [0] by default in an non-exclusive expanded accordion', () => {
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} expanded />,
      )
      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([0]))
    })

    it('is the value of prop defaultActiveIndex is passed', () => {
      const defaultActiveIndex = [1, 2]
      const accordion = mountWithProviderAndGetComponent(
        Accordion,
        <Accordion panels={panels} defaultActiveIndex={defaultActiveIndex} />,
      )
      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining(defaultActiveIndex))
    })

    it('contains the indexes clicked by the user if the panels were closed', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} />)
      const accordion = wrapper.find(Accordion)
      getTitleAtIndex(wrapper, 0).simulate('click')
      getTitleAtIndex(wrapper, 2).simulate('click')

      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([0, 2]))
    })

    it('contains the only one index clicked by the user if exclusive prop is passed', () => {
      const wrapper = mountWithProvider(<Accordion panels={panels} exclusive />)
      const accordion = wrapper.find(Accordion)
      getTitleAtIndex(wrapper, 0).simulate('click')
      getTitleAtIndex(wrapper, 2).simulate('click')

      expect(accordion.state('activeIndex')).toEqual(2)
    })

    it('has indexes removed when their panels are closed by the user', () => {
      const wrapper = mountWithProvider(
        <Accordion panels={panels} defaultActiveIndex={[0, 1, 2]} />,
      )
      const accordion = wrapper.find(Accordion)
      getTitleAtIndex(wrapper, 0).simulate('click')
      getTitleAtIndex(wrapper, 2).simulate('click')

      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([1]))
    })

    it('keeps the at least one panel open if expanded prop is passed', () => {
      const wrapper = mountWithProvider(
        <Accordion panels={panels} defaultActiveIndex={[0]} expanded />,
      )
      const accordion = wrapper.find(Accordion)
      getTitleAtIndex(wrapper, 0).simulate('click')

      expect(accordion.state('activeIndex')).toEqual(expect.arrayContaining([0]))
    })
  })

  describe('focusedIndex', () => {})
})
