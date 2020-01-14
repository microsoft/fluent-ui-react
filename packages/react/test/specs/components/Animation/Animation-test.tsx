import { isConformant } from '../../commonTests'

import { Animation } from '@fluentui/react'

describe('Animation', () => {
  isConformant(Animation, { hasAccessibilityProp: false })
})
