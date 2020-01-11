import { isConformant } from '../../commonTests'

import ToolbarMenuItem from '@fluentui/react/src/components/Toolbar/ToolbarMenuItem'
import Box from '@fluentui/react/src/components/Box/Box'

describe('ToolbarMenuItem', () => {
  isConformant(ToolbarMenuItem, {
    wrapperComponent: Box,
  })
})
