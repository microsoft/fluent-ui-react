import { isConformant } from 'test/specs/commonTests'

import ReactionGroup from 'src/components/Reaction/ReactionGroup'
import Reaction from 'src/components/Reaction/Reaction'
import implementsCollectionShorthandProp from 'test/specs/commonTests/implementsCollectionShorthandProp'

const reactionGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(
  ReactionGroup,
)

describe('ReactionGroup', () => {
  isConformant(ReactionGroup)
  reactionGroupImplementsCollectionShorthandProp('items', Reaction)
})
