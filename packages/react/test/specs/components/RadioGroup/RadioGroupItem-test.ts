import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import RadioGroupItem from 'src/components/RadioGroup/RadioGroupItem'

describe('RadioGroupItem', () => {
  isConformant(RadioGroupItem, { autocontrolledPropMappings: { checked: 'checkedChanged' } })

  describe('accessibility', () => {
    handlesAccessibility(RadioGroupItem, {
      defaultRootRole: 'radio',
    })
  })
})
