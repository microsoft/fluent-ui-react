import { isConformant } from '../../commonTests'

import { ToolbarMenuItem, Box } from '@fluentui/react'

describe('ToolbarMenuItem', () => {
  isConformant(ToolbarMenuItem, {
    wrapperComponent: Box,
  })
})
