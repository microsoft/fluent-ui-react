import { isConformant, implementsShorthandProp } from '../../commonTests'
import ChatItem from '@fluentui/react/src/components/Chat/ChatItem'
import Box from '@fluentui/react/src/components/Box/Box'

const chatItemImplementsShorthandProp = implementsShorthandProp(ChatItem)

describe('ChatItem', () => {
  isConformant(ChatItem)

  chatItemImplementsShorthandProp('gutter', Box, { mapsValueToProp: 'children' })
  chatItemImplementsShorthandProp('message', Box, { mapsValueToProp: 'children' })
})
