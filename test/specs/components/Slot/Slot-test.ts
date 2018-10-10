import { isConformant } from 'test/specs/commonTests'
import Slot from 'src/components/Slot'

describe('Slot', () => {
  isConformant(Slot, { exportedAtTopLevel: false })
})
