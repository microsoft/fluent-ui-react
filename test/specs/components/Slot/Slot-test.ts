import { mountWithProvider as mount } from 'test/utils'

import Slot from 'src/components/Slot/Slot'
import { isConformant } from 'test/specs/commonTests'

describe('Slot', () => {
  const createSlotComp = (factoryFn: Function, val, options?) =>
    mount(factoryFn(val, options)).find(Slot)

  xdescribe('is conformant', () => {
    isConformant(Slot, 'Slot', { exportedAtTopLevel: false })
  })

  describe(`create`, () => {
    it(`renders a ${Slot.defaultProps.as} element with children prop`, () => {
      const testChildren = 'test children'
      const slot = createSlotComp(Slot.create, testChildren)

      expect(slot.prop('as')).toEqual(Slot.defaultProps.as)
      expect(slot.prop('children')).toEqual(testChildren)
    })

    it(`renders an HTML element with correct prop`, () => {
      const testType = 'test type'
      const slot = createSlotComp(Slot.create, testType, {
        defaultProps: { as: 'input' },
      })

      expect(slot.prop('as')).toEqual('input')
      expect(slot.prop('type')).toEqual(testType)
    })
  })
})
