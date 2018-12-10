import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import List from 'src/components/List/List'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ListItem from 'src/components/List/ListItem'

const listImplementsCollectionShorthandProp = implementsCollectionShorthandProp(List)

describe('List', () => {
  isConformant(List, 'List')
  handlesAccessibility(List, { defaultRootRole: 'list' })
  listImplementsCollectionShorthandProp('items', ListItem, { mapsValueToProp: 'main' })
})
