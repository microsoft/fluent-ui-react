import { isConformant } from '../../commonTests'

import ReactionGroup from '@fluentui/react/src/components/Reaction/ReactionGroup'
import Reaction from '@fluentui/react/src/components/Reaction/Reaction'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'

const reactionGroupImplementsCollectionShorthandProp = implementsCollectionShorthandProp(
  ReactionGroup,
)

describe('ReactionGroup', () => {
  isConformant(ReactionGroup)
  reactionGroupImplementsCollectionShorthandProp('items', Reaction)
})
