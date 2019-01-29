import { isConformant } from 'test/specs/commonTests'
import Dialog from 'src/components/Dialog/Dialog'

describe('Dialog', () => {
  isConformant(Dialog, {
    rendersPortal: true,
  })
})
