import { shallow, mount } from 'enzyme'
import * as React from 'react'

import Ref from 'src/components/Ref/Ref'
import { CompositeClass, CompositeFunction, DOMClass, DOMFunction } from './fixtures'

const TestButton = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <div>
    <button ref={ref} />
  </div>
))

const testInnerRef = Component => {
  const innerRef = jest.fn()
  const node = mount(
    <Ref innerRef={innerRef}>
      <Component />
    </Ref>,
  ).getDOMNode()

  expect(innerRef).toHaveBeenCalledTimes(1)
  expect(innerRef).toHaveBeenCalledWith(node)
}

describe('Ref', () => {
  describe('children', () => {
    it('renders single child', () => {
      const child = <div data-child="whatever" />
      const component = shallow(<Ref>{child}</Ref>)

      expect(component.contains(child)).toBeTruthy()
    })
  })

  describe('innerRef', () => {
    it('returns node from a functional component with DOM node', () => {
      testInnerRef(DOMFunction)
    })

    it('returns node from a functional component', () => {
      testInnerRef(CompositeFunction)
    })

    it('returns node from a class component with DOM node', () => {
      testInnerRef(DOMClass)
    })

    it('returns node from a class component', () => {
      testInnerRef(CompositeClass)
    })

    it('returns "null" after unmount', () => {
      const innerRef = jest.fn()
      const wrapper = mount(
        <Ref innerRef={innerRef}>
          <CompositeClass />
        </Ref>,
      )

      innerRef.mockClear()
      wrapper.unmount()

      expect(innerRef).toHaveBeenCalledTimes(1)
      expect(innerRef).toHaveBeenCalledWith(null)
    })

    it('works with "forwardRef" API', () => {
      const forwardedRef = React.createRef<HTMLButtonElement>()
      const innerRef = React.createRef()

      mount(
        <Ref innerRef={innerRef}>
          <TestButton ref={forwardedRef} />
        </Ref>,
      )

      expect(forwardedRef.current).toBeInstanceOf(Element)
      expect(innerRef.current).toBeInstanceOf(Element)
    })
  })
})
