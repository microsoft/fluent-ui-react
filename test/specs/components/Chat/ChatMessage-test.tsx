import * as React from 'react'
import { handlesAccessibility, implementsShorthandProp, isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import ChatMessage from 'src/components/Chat/ChatMessage'
import Avatar from 'src/components/Avatar/Avatar'
import { chatMessageBehavior } from 'src/lib/accessibility'
import { AccessibilityDefinition } from 'src/lib/accessibility/types'
import Text from 'src/components/Text/Text'

describe('ChatMessage', () => {
  isConformant(ChatMessage, 'ChatMessage')
  implementsShorthandProp(ChatMessage)('avatar', Avatar, { mapsValueToProp: 'name' })
  implementsShorthandProp(ChatMessage)('author', Text)
  implementsShorthandProp(ChatMessage)('timestamp', Text)

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage, {
      focusZoneDefinition: (chatMessageBehavior as AccessibilityDefinition).focusZone,
    })
  })

  describe('avatar', () => {
    it('creates an Avatar component when the avatar shorthand is provided', () => {
      const name = 'John Doe'
      const chatMessage = mountWithProvider(<ChatMessage avatar={name} />)

      expect(chatMessage.find('Avatar').prop('name')).toEqual(name)
    })
  })
})
