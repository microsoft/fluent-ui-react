import { handlesAccessibility, isConformant } from 'test/specs/commonTests'

import Chat from 'src/components/Chat/Chat'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ChatItem from 'src/components/Chat/ChatItem'
import { chatBehavior } from 'src/lib/accessibility'
import { AccessibilityDefinition } from 'src/lib/accessibility/types'

const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Chat)

describe('Chat', () => {
  isConformant(Chat)
  chatImplementsCollectionShorthandProp('items', ChatItem)

  describe('accessibility', () => {
    handlesAccessibility(Chat, {
      defaultRootRole: 'presentation',
      focusZoneDefinition: (chatBehavior as AccessibilityDefinition).focusZone,
    })
  })
})
