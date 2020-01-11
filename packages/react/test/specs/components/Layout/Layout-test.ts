import { isConformant } from '../../commonTests'

import Layout from '@fluentui/react/src/components/Layout/Layout'

describe('Layout', () => {
  isConformant(Layout, { hasAccessibilityProp: false })
})
