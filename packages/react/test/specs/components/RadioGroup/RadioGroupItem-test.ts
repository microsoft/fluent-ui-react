import { isConformant, handlesAccessibility } from '../../commonTests'

import RadioGroupItem from '@fluentui/react/src/components/RadioGroup/RadioGroupItem'

describe('RadioGroupItem', () => {
  isConformant(RadioGroupItem)

  describe('accessibility', () => {
    handlesAccessibility(RadioGroupItem, {
      defaultRootRole: 'radio',
    })
  })
})
