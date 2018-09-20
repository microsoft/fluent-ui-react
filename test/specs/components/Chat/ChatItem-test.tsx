import { implementsShorthandProp, isConformant } from 'test/specs/commonTests'

import ChatItem from 'src/components/Chat/ChatItem'
import ChatBubble from '../../../../src/components/Chat/ChatBubble'
import Divider from '../../../../src/components/Divider/Divider'
import ChatAction from '../../../../src/components/Chat/ChatAction'

describe('ChatItem', () => {
  isConformant(ChatItem)
  implementsShorthandProp(ChatItem)('bubble', ChatBubble)
  implementsShorthandProp(ChatItem)('divider', Divider)
  implementsShorthandProp(ChatItem)('action', ChatAction)
})
