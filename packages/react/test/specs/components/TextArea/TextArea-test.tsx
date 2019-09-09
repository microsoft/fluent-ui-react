import * as React from 'react'
import { ReactWrapper } from 'enzyme'
import { mountWithProvider as mount } from 'test/utils'
import TextArea from 'src/components/TextArea/TextArea'
import { isConformant } from 'test/specs/commonTests'

const getTextAreaDomNode = (textAreaComp: ReactWrapper): HTMLTextAreaElement =>
  textAreaComp.find('textarea').getDOMNode() as HTMLTextAreaElement

const setUserTextAreaValue = (textAreaComp: ReactWrapper, value: string) => {
  textAreaComp.find('textarea').simulate('change', { target: { value } })
}

const testValue = 'test value'

describe('TextArea', () => {
  describe('conformance', () => {
    isConformant(TextArea, {
      eventTargets: {
        onChange: 'textarea',
        onKeyDown: 'textarea',
        onKeyPress: 'textarea',
        onKeyUp: 'textarea',
      },
    })
  })

  describe('auto-controlled', () => {
    it('sets input value from user when the value prop is not set (non-controlled mode)', () => {
      const textAreaComp = mount(<TextArea />)
      const domNode = getTextAreaDomNode(textAreaComp)
      setUserTextAreaValue(textAreaComp, testValue)

      expect(domNode.value).toEqual(testValue)
    })

    it('cannot set input value from user when the value prop is already set (controlled mode)', () => {
      const controlledTextAreaValue = 'controlled input value'
      const textAreaComp = mount(<TextArea value={controlledTextAreaValue} />)
      const domNode = getTextAreaDomNode(textAreaComp)
      setUserTextAreaValue(textAreaComp, testValue)

      expect(domNode.value).toEqual(controlledTextAreaValue)
    })
  })

  describe('auto-controlled', () => {
    it('sets TextArea value from user when the value prop is not set (non-controlled mode)', () => {
      const textAreaComp = mount(<TextArea />)
      const domNode = getTextAreaDomNode(textAreaComp)
      setUserTextAreaValue(textAreaComp, testValue)

      expect(domNode.value).toEqual(testValue)
    })

    it('cannot set TextArea value from user when the value prop is already set (controlled mode)', () => {
      const controlledTextAreaValue = 'controlled TextArea value'
      const textAreaComp = mount(<TextArea value={controlledTextAreaValue} />)
      const domNode = getTextAreaDomNode(textAreaComp)
      setUserTextAreaValue(textAreaComp, testValue)

      expect(domNode.value).toEqual(controlledTextAreaValue)
    })
  })
})
