import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import ListItem from 'src/components/List/ListItem'

describe('ListItem', () => {
  isConformant(ListItem, 'ListItem')
  handlesAccessibility(ListItem, { defaultRootRole: 'listitem' })
})
