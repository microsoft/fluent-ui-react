import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'
import ChatItem from 'src/components/Chat/ChatItem'
import Slot from 'src/components/Slot/Slot'

const chatItemImplementsShorthandProp = implementsShorthandProp(ChatItem)

describe('ChatItem', () => {
  isConformant(ChatItem)

  chatItemImplementsShorthandProp('gutter', Slot, { mapsValueToProp: 'children' })
  chatItemImplementsShorthandProp('message', Slot, { mapsValueToProp: 'children' })
})
