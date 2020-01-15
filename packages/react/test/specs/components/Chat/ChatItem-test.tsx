import { isConformant, implementsShorthandProp } from '../../commonTests'
import { ChatItem, Box } from '@fluentui/react'

const chatItemImplementsShorthandProp = implementsShorthandProp(ChatItem)

describe('ChatItem', () => {
  isConformant(ChatItem)

  chatItemImplementsShorthandProp('gutter', Box, { mapsValueToProp: 'children' })
  chatItemImplementsShorthandProp('message', Box, { mapsValueToProp: 'children' })
})
