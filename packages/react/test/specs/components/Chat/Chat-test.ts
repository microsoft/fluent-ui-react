import { handlesAccessibility, isConformant } from 'test/specs/commonTests'

import Chat from 'src/components/Chat/Chat'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ChatItem from 'src/components/Chat/ChatItem'
import { chatBehavior } from 'src/lib/accessibility'
import { AccessibilityDefinition } from 'src/lib/accessibility/types'

const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Chat)

describe('Chat', () => {
  isConformant(Chat)
  chatImplementsCollectionShorthandProp('items', ChatItem, { mapsValueToProp: 'message' })

  describe('accessibility', () => {
    handlesAccessibility(Chat, {
      focusZoneDefinition: (chatBehavior as AccessibilityDefinition).focusZone,
    })
  })
})
