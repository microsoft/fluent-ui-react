import { isConformant } from '../../commonTests'
import { TreeItem } from '@fluentui/react'

describe('TreeItem', () => {
  isConformant(TreeItem, { requiredProps: { id: 'my-id' } })
})
