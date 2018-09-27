import { isConformant, handlesAccessibility } from 'test/specs/commonTests'

import Chat from 'src/components/Chat'
import ChatBehavior from 'src/lib/accessibility/Behaviors/Chat/ChatBehavior'
import { IAccessibilityDefinition } from 'src/lib/accessibility/interfaces'

describe('Chat', () => {
  isConformant(Chat)

  describe('accessibility', () => {
    handlesAccessibility(Chat, {
      defaultRootRole: 'presentation',
      focusZoneDefinition: (ChatBehavior as IAccessibilityDefinition).focusZone,
    })
  })
})
