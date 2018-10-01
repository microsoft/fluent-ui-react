import { handlesAccessibility, isConformant } from 'test/specs/commonTests'

import Chat from 'src/components/Chat'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ChatItem from 'src/components/Chat/ChatItem'
import ChatBehavior from 'src/lib/accessibility/Behaviors/Chat/ChatBehavior'
import { IAccessibilityDefinition } from 'src/lib/accessibility/interfaces'

const chatImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Chat)

describe('Chat', () => {
  isConformant(Chat)
  chatImplementsCollectionShorthandProp('items', ChatItem)

  describe('accessibility', () => {
    handlesAccessibility(Chat, {
      defaultRootRole: 'presentation',
      focusZoneDefinition: (ChatBehavior as IAccessibilityDefinition).focusZone,
    })
  })
})
