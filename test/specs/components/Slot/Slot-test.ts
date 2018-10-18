import { mount } from 'enzyme'

import Slot from 'src/components/Slot'
import { isConformant } from 'test/specs/commonTests'

describe('Slot', () => {
  const createSlot = (factoryFn: Function, val, options?) =>
    mount(factoryFn(val, options)).find(Slot)

  describe('is conformant', () => {
    isConformant(Slot, { exportedAtTopLevel: false })
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
