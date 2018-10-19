import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import RadioGroupItem from 'src/components/RadioGroup/RadioGroupItem'

describe('RadioGroupItem', () => {
  describe('isConformant', () => {
    isConformant(RadioGroupItem)
  })

  describe('accessibility', () => {
    handlesAccessibility(RadioGroupItem, {
      defaultRootRole: 'radio',
    })
  })
})
