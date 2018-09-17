import { isConformant } from 'test/specs/commonTests'
import { initKeyboardFocusMock } from 'test/specs/lib/keyboardFocusMock'

import RadioGroupItem from 'src/components/RadioGroup'

initKeyboardFocusMock()

describe('RadioGroupItem', () => {
  isConformant(RadioGroupItem, {
    eventTargets: {
      onChange: 'root',
    },
  })
})
