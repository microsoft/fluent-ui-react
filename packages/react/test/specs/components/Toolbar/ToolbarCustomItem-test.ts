import { isConformant } from '../../commonTests'

import ToolbarCustomItem from '@fluentui/react/src/components/Toolbar/ToolbarCustomItem'

describe('ToolbarCustomItem', () => {
  isConformant(ToolbarCustomItem, {
    requiredProps: { focusable: true },
  })
})
