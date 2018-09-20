import * as React from 'react'
import { implementsShorthandProp, isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from '../../../utils'

import ChatBubble from 'src/components/Chat/ChatBubble'
import Avatar from 'src/components/Avatar'
import Text from 'src/components/Text'

describe('ChatBubble', () => {
  isConformant(ChatBubble)
  implementsShorthandProp(ChatBubble)('avatar', Avatar, { mapsValueToProp: 'name' })
  implementsShorthandProp(ChatBubble)('author', Text)
  implementsShorthandProp(ChatBubble)('timestamp', Text)

  describe('avatar', () => {
    it('creates an Avatar component when the avatar shorthand is provided', () => {
      const name = 'John Doe'
      const chatBubble = mountWithProvider(<ChatBubble avatar={name} />)

      expect(chatBubble.find('Avatar').prop('name')).toEqual(name)
    })
  })
})
