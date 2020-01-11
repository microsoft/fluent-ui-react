import { chatMessageBehavior, AccessibilityDefinition } from '@fluentui/accessibility'
import * as React from 'react'

import { handlesAccessibility, implementsShorthandProp, isConformant } from '../../commonTests'
import { mountWithProvider } from '../../../utils'

import ChatMessage from '@fluentui/react/src/components/Chat/ChatMessage'
import Text from '@fluentui/react/src/components/Text/Text'
import Box from '@fluentui/react/src/components/Box/Box'

const chatMessageImplementsShorthandProp = implementsShorthandProp(ChatMessage)

describe('ChatMessage', () => {
  isConformant(ChatMessage)

  chatMessageImplementsShorthandProp('author', Text)
  chatMessageImplementsShorthandProp('timestamp', Text)
  chatMessageImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' })

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage, {
      focusZoneDefinition: (chatMessageBehavior as AccessibilityDefinition).focusZone,
    })
  })

  describe('onMouseEnter', () => {
    it('performs position update', () => {
      const wrapper = mountWithProvider(<ChatMessage />)
      const update = jest.spyOn(wrapper.instance() as any, 'updateActionsMenuPosition')

      wrapper.simulate('mouseenter')
      expect(update).toBeCalledTimes(1)
    })
  })
})
