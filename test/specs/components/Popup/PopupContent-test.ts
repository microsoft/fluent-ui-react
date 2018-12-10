import { isConformant } from 'test/specs/commonTests'
import PopupContent from 'src/components/Popup/PopupContent'

describe('PopupContent', () => {
  isConformant(PopupContent, 'PopupContent', { rendersPortal: true })
})
