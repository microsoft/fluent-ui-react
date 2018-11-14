import { mountWithProvider as mount } from 'test/utils'

import Slot from 'src/components/Slot/Slot'
import { isConformant } from 'test/specs/commonTests'

describe('Slot', () => {
  const createSlotComp = (factoryFn: Function, val, options?) =>
    mount(factoryFn(val, options)).find(Slot)

  xdescribe('is conformant', () => {
    isConformant(Slot, { exportedAtTopLevel: false })
  })

  it(`create renders a ${Slot.defaultProps.as} element with content prop`, () => {
    const testContent = 'test content'
    const slot = createSlotComp(Slot.create, testContent)

    expect(slot.prop('as')).toEqual(Slot.defaultProps.as)
    expect(slot.prop('content')).toEqual(testContent)
  })

  describe(`createHTMLElement`, () => {
    it(`renders an HTML element with 'children' prop by default`, () => {
      const childrenValue = 'test type'
      const slot = createSlotComp(Slot.createHTMLElement, childrenValue)

      expect(slot.prop('as')).toEqual('div')
      expect(slot.prop('children')).toEqual(childrenValue)
    })

    it(`renders an HTML element with correct prop`, () => {
      const testType = 'test type'
      const slot = createSlotComp(Slot.createHTMLElement, testType, {
        defaultProps: { as: 'input' },
      })

      expect(slot.prop('as')).toEqual('input')
      expect(slot.prop('type')).toEqual(testType)
    })
  })
})
