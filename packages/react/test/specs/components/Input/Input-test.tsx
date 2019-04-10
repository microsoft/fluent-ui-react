import * as faker from 'faker'
import * as React from 'react'

import { ReactWrapper } from 'enzyme'
import { mountWithProvider as mount } from 'test/utils'
import {
  isConformant,
  implementsShorthandProp,
  implementsWrapperProp,
} from 'test/specs/commonTests'

import Input from 'src/components/Input/Input'
import Icon from 'src/components/Icon/Icon'
import Box from 'src/components/Box/Box'

const testValue = 'test value'
const htmlInputAttrs = ['id', 'name', 'pattern', 'placeholder', 'type', 'value']

const getInputAttrsObject = (testValue: string) =>
  htmlInputAttrs.reduce((acc, attr) => {
    acc[attr] = testValue
    return acc
  }, {})

const getInputDomNode = (inputComp: ReactWrapper): HTMLInputElement =>
  inputComp.find('input').getDOMNode() as HTMLInputElement

const setUserInputValue = (inputComp: ReactWrapper, value: string) => {
  inputComp.find('input').simulate('change', { target: { value } })
}

describe('Input', () => {
  describe('conformance', () => {
    isConformant(Input, {
      eventTargets: {
        onChange: 'input',
        onKeyDown: 'input',
        onKeyPress: 'input',
        onKeyUp: 'input',
      },
    })
  })

  implementsShorthandProp(Input)('input', Box, { mapsValueToProp: 'type' })
  implementsShorthandProp(Input)('icon', Icon, { mapsValueToProp: 'name' })

  describe('wrapper', () => {
    implementsShorthandProp(Input)('wrapper', Box, { mapsValueToProp: 'children' })
    implementsWrapperProp(Input, { wrapppedComponentSelector: 'input' })
  })

  it('renders a text <input> by default', () => {
    const inputComp = mount(<Input />)
    expect(inputComp.find('input[type="text"]').length).toBeGreaterThan(0)
  })

  describe('input related HTML attribute', () => {
    const inputAttrsObject = getInputAttrsObject(testValue)
    const domNode = getInputDomNode(mount(<Input {...inputAttrsObject} />))

    htmlInputAttrs.forEach(attr => {
      it(`'${attr}' is set correctly to '${testValue}'`, () => {
        expect(domNode[attr]).toEqual(testValue)
      })
    })
  })

  describe('auto-controlled', () => {
    it('sets input value from user when the value prop is not set (non-controlled mode)', () => {
      const inputComp = mount(<Input />)
      const domNode = getInputDomNode(inputComp)
      setUserInputValue(inputComp, testValue)

      expect(domNode.value).toEqual(testValue)
    })

    it('cannot set input value from user when the value prop is already set (controlled mode)', () => {
      const controlledInputValue = 'controlled input value'
      const inputComp = mount(<Input value={controlledInputValue} />)
      const domNode = getInputDomNode(inputComp)
      setUserInputValue(inputComp, testValue)

      expect(domNode.value).toEqual(controlledInputValue)
    })
  })

  describe('clearable', () => {
    it('calls onChange on Icon click with an `empty` value', () => {
      const onChange = jest.fn()
      const wrapper = mount(
        <Input clearable defaultValue={faker.lorem.word()} onChange={onChange} />,
      )

      wrapper.find('Icon').simulate('click')
      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ value: '' }),
      )
    })
  })

  describe('icon', () => {
    it('creates the Icon component when the icon shorthand is provided', () => {
      const inputComp = mount(<Input icon={{ name: 'search' }} />)
      expect(inputComp.find('Icon[name="search"]').length).toBeGreaterThan(0)
    })

    it('creates the "close" Icon component when the clearable prop is provided and the input has content, removes the icon and value when the icon is clicked', () => {
      const inputComp = mount(<Input clearable />)
      const domNode = getInputDomNode(inputComp)
      setUserInputValue(inputComp, testValue) // user types into the input
      const iconComp = inputComp.find('Icon[name="stardust-close"]')

      expect(domNode.value).toEqual(testValue) // input value is the one typed by the user
      expect(iconComp.length).toBeGreaterThan(0) // the 'x' icon appears

      iconComp.simulate('click') // user clicks on 'x' icon

      expect(domNode.value).toEqual('') // input value gets cleared
      expect(inputComp.find('Icon[name="stardust-close"]').length).toEqual(0) // the 'x' icon disappears
    })
  })
})
