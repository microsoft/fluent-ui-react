// import { handlesAccessibility, isConformant } from 'test/specs/commonTests'
import { isConformant } from 'test/specs/commonTests'

import Dropdown from 'src/components/Dropdown/Dropdown'
// import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
// import { chatBehavior } from 'src/lib/accessibility'
// import { AccessibilityDefinition } from 'src/lib/accessibility/types'

// const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Dropdown)

describe('Dropdown', () => {
  isConformant(Dropdown)

  describe('accessibility', () => {})
})
