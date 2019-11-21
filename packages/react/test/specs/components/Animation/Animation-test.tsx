import { isConformant } from 'test/specs/commonTests'

import Animation from 'src/components/Animation/Animation'

describe('Animation', () => {
  isConformant(Animation, { hasAccessibilityProp: false })
})
