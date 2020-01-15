import { isConformant } from '../../commonTests'

import { ReactionGroup, Reaction } from '@fluentui/react'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'

const reactionGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(
  ReactionGroup,
)

describe('ReactionGroup', () => {
  isConformant(ReactionGroup)
  reactionGroupImplementsCollectionShorthandProp('items', Reaction)
})
