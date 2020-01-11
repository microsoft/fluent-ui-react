import { isConformant } from '../../commonTests'
import PopupContent from '@fluentui/react/src/components/Popup/PopupContent'

describe('PopupContent', () => {
  isConformant(PopupContent, { rendersPortal: true })
})
