import { mountWithProvider as mount } from 'test/utils'

import Slot, { createSlotFactory } from 'src/components/Slot/Slot'
import { isConformant } from 'test/specs/commonTests'

interface IHtmlFactoryTestOptions {
  fn?: Function
  asElement: string
  mappedProp: string
}

describe('Slot', () => {
  const createSlot = (factoryFn: Function, val) => mount(factoryFn(val)).find(Slot)

  const slotFactoryFnTests = ({ fn, asElement, mappedProp }: IHtmlFactoryTestOptions) =>
    it(`renders a '${asElement}' element with '${mappedProp}' prop`, () => {
      const mappedPropValue = 'mapped prop value'
      const slot = createSlot(fn, mappedPropValue)
      const { as, [mappedProp]: prop } = slot.props()

      expect(as).toEqual(asElement)
      expect(prop).toEqual(mappedPropValue)
    })

  describe('is conformant', () => {
    isConformant(Slot, { exportedAtTopLevel: false })
  })

  describe('create', () => {
    slotFactoryFnTests({ fn: Slot.create, asElement: Slot.defaultProps.as, mappedProp: 'content' })
  })

  describe('HTML Factories - createSlotFactory', () => {
    const factoryTestOptions: IHtmlFactoryTestOptions[] = [
      {
        asElement: 'div',
        mappedProp: 'children',
      },
      {
        asElement: 'iframe',
        mappedProp: 'src',
      },
      {
        asElement: 'img',
        mappedProp: 'src',
      },
      {
        asElement: 'input',
        mappedProp: 'type',
      },
      {
        asElement: 'label',
        mappedProp: 'children',
      },
      {
        asElement: 'p',
        mappedProp: 'children',
      },
    ]

    factoryTestOptions.map(({ asElement, mappedProp }: IHtmlFactoryTestOptions) =>
      slotFactoryFnTests({ fn: createSlotFactory(asElement), asElement, mappedProp }),
    )
  })

  describe('HTML Factories - createSlotFactory when mapValueToProps is provided as argument', () => {
    const mappedProp = 'mappedProp'

    slotFactoryFnTests({
      fn: createSlotFactory('div', mappedProp => ({ mappedProp })),
      asElement: 'div',
      mappedProp,
    })
  })
})
