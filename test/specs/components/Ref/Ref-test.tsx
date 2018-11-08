import * as React from 'react'
import { shallow, mount } from 'enzyme'

import { CompositeClass, CompositeFunction, DOMClass, DOMFunction } from './fixtures'
import Ref from 'src/components/Ref/Ref'

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
  })
})
