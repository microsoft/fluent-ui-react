import { isConformant } from '../../commonTests'
import { PopupContent } from '@fluentui/react'

describe('PopupContent', () => {
  isConformant(PopupContent, { rendersPortal: true })
})
