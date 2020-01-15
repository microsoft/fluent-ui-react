import { isConformant, handlesAccessibility } from '../../commonTests'

import { RadioGroupItem } from '@fluentui/react'

describe('RadioGroupItem', () => {
  isConformant(RadioGroupItem)

  describe('accessibility', () => {
    handlesAccessibility(RadioGroupItem, {
      defaultRootRole: 'radio',
    })
  })
})
