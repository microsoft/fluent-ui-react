import { handlesAccessibility, isConformant } from '../../commonTests'

import Box from '@fluentui/react/src/components/Box/Box'
import ToolbarMenuRadioGroup from '@fluentui/react/src/components/Toolbar/ToolbarMenuRadioGroup'

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
