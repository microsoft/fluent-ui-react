import { mountWithProvider as mount } from 'test/utils'

import Slot, { createSlot, createHTMLInput } from 'src/components/Slot/Slot'
import { isConformant } from 'test/specs/commonTests'

describe('Slot', () => {
  const createSlotComp = (factoryFn: Function, val, options?) =>
    mount(factoryFn(val, options)).find(Slot)

  xdescribe('is conformant', () => {
    isConformant(Slot, { exportedAtTopLevel: false })
  })

  it(`create renders a ${Slot.defaultProps.as} element with content prop`, () => {
    const testContent = 'test content'
    const slot = createSlotComp(createSlot, testContent)
    const { as, content } = slot.props()

    expect(as).toEqual(Slot.defaultProps.as)
    expect(content).toEqual(testContent)
  })

  it(`createHTMLInput renders an input element with type prop`, () => {
    const testType = 'test type'
    const slot = createSlotComp(createHTMLInput, testType)
    const { as, type } = slot.props()

    expect(as).toEqual('input')
    expect(type).toEqual(testType)
  })
})
