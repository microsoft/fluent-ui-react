import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'
import ChatItemGutter from 'src/components/Chat/ChatItemGutter'
import Slot from 'src/components/Slot/Slot'

const chatItemGutterImplementsShorthandProp = implementsShorthandProp(ChatItemGutter)

describe('ChatItemGutter', () => {
  isConformant(ChatItemGutter)

  chatItemGutterImplementsShorthandProp('content', Slot, { mapsValueToProp: 'children' })
})
