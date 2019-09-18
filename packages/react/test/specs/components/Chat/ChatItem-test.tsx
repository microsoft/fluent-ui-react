import ChatGutter from 'src/components/Chat/ChatGutter'
import ChatItem from 'src/components/Chat/ChatItem'
import ChatMessage from 'src/components/Chat/ChatMessage'
import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'

const chatItemImplementsShorthandProp = implementsShorthandProp(ChatItem)

describe('ChatItem', () => {
  isConformant(ChatItem)

  chatItemImplementsShorthandProp('gutter', ChatGutter)
  chatItemImplementsShorthandProp('message', ChatMessage)
})
