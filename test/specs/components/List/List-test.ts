import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import List from 'src/components/List/List'

describe('List', () => {
  isConformant(List)
  handlesAccessibility(List, { defaultRootRole: 'list' })
})
