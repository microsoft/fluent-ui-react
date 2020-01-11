import { isConformant } from '../../commonTests'

import ItemLayout from '@fluentui/react/src/components/ItemLayout/ItemLayout'

describe('ItemLayout', () => {
  isConformant(ItemLayout, { hasAccessibilityProp: false })
})
