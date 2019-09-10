import * as React from 'react'
import { mountWithProvider as mount } from 'test/utils'
import TextArea from 'src/components/TextArea/TextArea'
import { isConformant } from 'test/specs/commonTests'

const testValue = 'test value'

describe('TextArea', () => {
  isConformant(TextArea)

  describe('defaultValue', () => {
    test('sets "defaultValue" as initial "value"', () => {
      const wrapper = mount(<TextArea defaultValue={testValue} />)

      expect(wrapper.find('textarea').prop('value')).toBe(testValue)
    })
  })

  describe('auto-controlled', () => {
    it('sets TextArea value from user when the value prop is not set (non-controlled mode)', () => {
      const wrapper = mount(<TextArea />)
      wrapper.simulate('change', { target: { value: testValue } })

      expect(wrapper.find('textarea').prop('value')).toBe(testValue)
    })

    it('cannot set TextArea value from user when the value prop is already set (controlled mode)', () => {
      const controlledTextAreaValue = 'controlled TextArea value'
      const wrapper = mount(<TextArea value={controlledTextAreaValue} />)
      wrapper.simulate('change', { target: { value: testValue } })

      expect(wrapper.find('textarea').prop('value')).toBe(controlledTextAreaValue)
    })
  })

  describe('onChange', () => {
    test('is called with (e, data)', () => {
      const onChange = jest.fn()
      const wrapper = mount(<TextArea onChange={onChange} />)

      wrapper.simulate('change', { target: { value: testValue } })
      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ type: 'change' }),
        expect.objectContaining({ value: testValue }),
      )
    })
  })
})
