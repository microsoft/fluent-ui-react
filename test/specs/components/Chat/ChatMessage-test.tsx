import * as React from 'react'
import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'
import { mountWithProvider } from '../../../utils'

import ChatMessage from 'src/components/Chat/ChatMessage'
import Avatar from 'src/components/Avatar'

describe('ChatMessage', () => {
  isConformant(ChatMessage)
  implementsShorthandProp(ChatMessage)('avatar', Avatar, { mapsValueToProp: 'name' })

  describe('avatar', () => {
    it('creates an Avatar component when the avatar shorthand is provided', () => {
      const name = 'John Doe'
      const chatMsg = mountWithProvider(<ChatMessage avatar={name} />)

      expect(chatMsg.find('Avatar').prop('name')).toEqual(name)
    })
  })
})
