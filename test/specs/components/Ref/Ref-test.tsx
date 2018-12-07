import { shallow } from 'enzyme'
import * as React from 'react'

import Ref from 'src/components/Ref/Ref'
import RefFindNode from 'src/components/Ref/RefFindNode'
import RefForward from 'src/components/Ref/RefForward'
import { CompositeClass, ForwardedRef } from './fixtures'

describe('Ref', () => {
  describe('children', () => {
    it('renders single child', () => {
      const child = <div data-child="whatever" />
      const component = shallow(<Ref>{child}</Ref>)

      expect(component.contains(child)).toBeTruthy()
    })

    it('renders RefFindNode when a component is passed', () => {
      const innerRef = React.createRef()
      const wrapper = shallow(
        <Ref innerRef={innerRef}>
          <CompositeClass />
        </Ref>,
      )

      expect(wrapper.is(RefFindNode)).toBe(true)
    })

    it('renders RefForward when a component wrapper with forwardRef() is passed', () => {
      const innerRef = React.createRef()
      const wrapper = shallow(
        <Ref innerRef={innerRef}>
          <ForwardedRef />
        </Ref>,
      )

      expect(wrapper.is(RefForward)).toBe(true)
    })
  })
})
