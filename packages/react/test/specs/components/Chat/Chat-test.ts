import { chatBehavior, AccessibilityDefinition } from '@fluentui/accessibility'
import { handlesAccessibility, isConformant } from '../../commonTests'

import Chat from '@fluentui/react/src/components/Chat/Chat'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ChatItem from '@fluentui/react/src/components/Chat/ChatItem'

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
