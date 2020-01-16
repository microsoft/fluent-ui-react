import { isConformant } from '../../commonTests'

import { Layout } from '@fluentui/react'

describe('Layout', () => {
  isConformant(Layout, { hasAccessibilityProp: false })
})
