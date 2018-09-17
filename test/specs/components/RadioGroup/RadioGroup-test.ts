import { isConformant } from 'test/specs/commonTests'
import { initKeyboardFocusMock } from 'test/specs/lib/keyboardFocusMock'

import RadioGroup from 'src/components/RadioGroup'

initKeyboardFocusMock()

describe('RadioGroup', () => {
  isConformant(RadioGroup)
})
