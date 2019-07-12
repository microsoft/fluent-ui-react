import * as React from 'react'
import { ReactWrapper } from 'enzyme'

import { mountWithProvider as mount } from 'test/utils'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import Slider from 'src/components/Slider/Slider'

const getInputDomNode = (sliderComp: ReactWrapper): HTMLInputElement =>
  sliderComp.find('input').getDOMNode() as HTMLInputElement

const setUserInputValue = (sliderComp: ReactWrapper, value: string) => {
  sliderComp.find('input').simulate('change', { target: { value } })
}

describe('Slider', () => {
  describe('conformance', () => {
    isConformant(Slider, {
      eventTargets: {
        onChange: 'input',
        onKeyDown: 'input',
        onKeyPress: 'input',
        onKeyUp: 'input',
      },
    })
  })

  describe('auto-controlled', () => {
    it('sets slider value from user when the value prop is not set (non-controlled mode)', () => {
      const sliderComp = mount(<Slider />)
      const domNode = getInputDomNode(sliderComp)
      setUserInputValue(sliderComp, '30')

      expect(domNode.value).toEqual('30')
    })

    it('cannot set input value from user when the value prop is already set (controlled mode)', () => {
      const sliderComp = mount(<Slider value={'80'} />)
      const domNode = getInputDomNode(sliderComp)
      setUserInputValue(sliderComp, '30')

      expect(domNode.value).toEqual('80')
    })
  })

  describe('accessibility', () => {
    handlesAccessibility(Slider, { partSelector: 'input' })
  })
})
