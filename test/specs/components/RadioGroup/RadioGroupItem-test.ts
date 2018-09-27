import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import { RadioGroupItem } from 'src/components/RadioGroup'

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
