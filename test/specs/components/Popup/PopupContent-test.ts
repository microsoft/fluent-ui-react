import { isConformant } from 'test/specs/commonTests'
import { PopupContent } from 'src/components/Popup'

describe('PopupContent', () => {
  isConformant(PopupContent, { rendersPortal: true })
})
