import { isConformant } from '../../commonTests'

import Animation from '@fluentui/react/src/components/Animation/Animation'

describe('Animation', () => {
  isConformant(Animation, { hasAccessibilityProp: false })
})
