import { mount } from 'enzyme'

import * as lib from 'src/lib'
import Slot from 'src/components/Slot'
import { createSlotFactory } from 'src/components/Slot/Slot'
import { isConformant } from 'test/specs/commonTests'

describe('Slot', () => {
  const createSlot = (factoryFn: Function, val, options?) =>
    mount(factoryFn(val, options)).find(Slot)

  describe('is conformant', () => {
    isConformant(Slot, { exportedAtTopLevel: false })
  })

  describe('createSlotFactory', () => {
    it('calls createShorthand from lib', () => {
      const mapValueToProp = mappedProp => ({ mappedProp })
      const value = 'testValue'
      const createShorthandSpy = spyOn(lib, 'createShorthand')
      createSlotFactory('span', mapValueToProp)(value)

      expect(createShorthandSpy).toHaveBeenCalledWith(
        Slot,
        mapValueToProp,
        value,
        expect.any(Object),
      )
    })

    it('sets correct "as" prop in defaultProps', () => {
      const as = 'span'
      const options = { testOption: 'test option value' }
      const createShorthandSpy = spyOn(lib, 'createShorthand')
      createSlotFactory(as, () => ({}))('testValue', { ...options }) // clone of the options

      const optionsArg = createShorthandSpy.calls.mostRecent().args[3]
      expect(optionsArg).toEqual({ defaultProps: { as }, ...options })
    })

    it('overrides "as" prop in defaultProps', () => {
      const as = 'span'
      const asOverride = 'p'
      const createShorthandSpy = spyOn(lib, 'createShorthand')
      createSlotFactory(as, () => ({}))('testValue', { defaultProps: { as: asOverride } }) // clone of the options

      const optionsArg = createShorthandSpy.calls.mostRecent().args[3]
      expect(optionsArg).toEqual({ defaultProps: { as: asOverride } })
    })
  })

  it(`create renders a ${Slot.defaultProps.as} element with content prop`, () => {
    const testContent = 'test content'
    const slot = createSlot(Slot.create, testContent)
    const { as, content } = slot.props()

    expect(as).toEqual(Slot.defaultProps.as)
    expect(content).toEqual(testContent)
  })

  it(`createHTMLInput renders an input element with type prop`, () => {
    const testType = 'test type'
    const slot = createSlot(Slot.createHTMLInput, testType)
    const { as, type } = slot.props()

    expect(as).toEqual('input')
    expect(type).toEqual(testType)
  })
})
