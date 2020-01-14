import { isConformant } from '../../commonTests'

import { ToolbarCustomItem } from '@fluentui/react'

describe('ToolbarCustomItem', () => {
  isConformant(ToolbarCustomItem, {
    requiredProps: { focusable: true },
  })
})
