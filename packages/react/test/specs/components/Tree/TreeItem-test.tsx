import { isConformant } from '../../commonTests'
import TreeItem from '@fluentui/react/src/components/Tree/TreeItem'

describe('TreeItem', () => {
  isConformant(TreeItem, { requiredProps: { id: 'my-id' } })
})
