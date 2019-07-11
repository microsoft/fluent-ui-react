import * as React from 'react'
import { ReactWrapper } from 'enzyme'

import { mountWithProvider as mount } from 'test/utils'
import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import Slider from 'src/components/Slider/Slider'

const testValue = '30'
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
      setUserInputValue(sliderComp, testValue)

      expect(domNode.value).toEqual(testValue)
    })

    it('cannot set input value from user when the value prop is already set (controlled mode)', () => {
      const controlledInputValue = '80'
      const sliderComp = mount(<Slider value={controlledInputValue} />)
      const domNode = getInputDomNode(sliderComp)
      setUserInputValue(sliderComp, testValue)

      expect(domNode.value).toEqual(controlledInputValue)
    })
  })

  describe('accessibility', () => {
    handlesAccessibility(Slider, { partSelector: 'input' })
  })
})
