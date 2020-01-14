import { handlesAccessibility, isConformant } from '../../commonTests'

import { Box, ToolbarMenuRadioGroup } from '@fluentui/react'

describe('ToolbarMenuRadioGroup', () => {
  isConformant(ToolbarMenuRadioGroup, {
    wrapperComponent: Box,
  })

  describe('accessibility', () => {
    handlesAccessibility(ToolbarMenuRadioGroup, {
      defaultRootRole: 'group',
      partSelector: 'ul',
      usesWrapperSlot: true,
    })
  })
})
