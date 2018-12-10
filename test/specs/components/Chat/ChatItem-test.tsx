import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'
import ChatItem from 'src/components/Chat/ChatItem'
import ChatGutter from 'src/components/Chat/ChatGutter'
import Slot from 'src/components/Slot/Slot'

const chatItemImplementsShorthandProp = implementsShorthandProp(ChatItem)

describe('ChatItem', () => {
  isConformant(ChatItem)

  chatItemImplementsShorthandProp('content', Slot, { mapsValueToProp: 'children' })
  chatItemImplementsShorthandProp('gutter', ChatGutter, { mapsValueToProp: 'content' })
})
