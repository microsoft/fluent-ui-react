import { isConformant } from 'test/specs/commonTests'

import Layout from 'src/components/Layout/Layout'

describe('Layout', () => {
  isConformant(Layout, { hasAccessibilityProp: false })
})
