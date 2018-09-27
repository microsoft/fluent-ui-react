import * as React from 'react'
import { isConformant, implementsShorthandProp, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from '../../../utils'

import ChatMessage from 'src/components/Chat/ChatMessage'
import Avatar from 'src/components/Avatar'
import ChatMessageBehavior from 'src/lib/accessibility/Behaviors/Chat/ChatMessageBehavior'
import { IAccessibilityDefinition } from 'src/lib/accessibility/interfaces'
import Text from 'src/components/Text'

describe('ChatMessage', () => {
  isConformant(ChatMessage)
  implementsShorthandProp(ChatMessage)('avatar', Avatar, { mapsValueToProp: 'name' })
  implementsShorthandProp(ChatMessage)('author', Text)
  implementsShorthandProp(ChatMessage)('timestamp', Text)

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage, {
      defaultRootRole: 'presentation',
      focusZoneDefinition: (ChatMessageBehavior as IAccessibilityDefinition).focusZone,
    })
  })

  describe('avatar', () => {
    it('creates an Avatar component when the avatar shorthand is provided', () => {
      const name = 'John Doe'
      const chatMsg = mountWithProvider(<ChatMessage avatar={name} />)

      expect(chatMsg.find('Avatar').prop('name')).toEqual(name)
    })
  })
})
