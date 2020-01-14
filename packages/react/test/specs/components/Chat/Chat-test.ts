import { chatBehavior, AccessibilityDefinition } from '@fluentui/accessibility'
import { handlesAccessibility, isConformant } from '../../commonTests'

import { Chat, ChatItem } from '@fluentui/react'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'

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
