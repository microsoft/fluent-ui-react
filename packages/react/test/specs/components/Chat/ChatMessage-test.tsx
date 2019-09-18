import * as React from 'react'

import { handlesAccessibility, implementsShorthandProp, isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import ChatAuthor from 'src/components/Chat/ChatAuthor'
import ChatContent from 'src/components/Chat/ChatContent'
import ChatMessage from 'src/components/Chat/ChatMessage'
import ChatTimestamp from 'src/components/Chat/ChatTimestamp'
import { chatMessageBehavior } from 'src/lib/accessibility'
import { AccessibilityDefinition } from 'src/lib/accessibility/types'

const chatMessageImplementsShorthandProp = implementsShorthandProp(ChatMessage)

describe('ChatMessage', () => {
  isConformant(ChatMessage)

  chatMessageImplementsShorthandProp('author', ChatAuthor)
  chatMessageImplementsShorthandProp('timestamp', ChatTimestamp)
  chatMessageImplementsShorthandProp('content', ChatContent)

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage, {
      focusZoneDefinition: (chatMessageBehavior as AccessibilityDefinition).focusZone,
    })
  })

  describe('onMouseEnter', () => {
    it('performs position update', () => {
      const wrapper = mountWithProvider(<ChatMessage />)
      const update = jest.spyOn(wrapper.instance(), 'updateActionsMenuPosition')

      wrapper.simulate('mouseenter')
      expect(update).toBeCalledTimes(1)
    })
  })
})
