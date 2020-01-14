import { isConformant } from '../../commonTests'

import { ItemLayout } from '@fluentui/react'

describe('ItemLayout', () => {
  isConformant(ItemLayout, { hasAccessibilityProp: false })
})
