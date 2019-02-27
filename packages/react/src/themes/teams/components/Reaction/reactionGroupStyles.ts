import { ComponentSlotStylesInput } from '../../../types'
import { ReactionProps } from '../../../../components/Reaction/Reaction'
import { ReactionGroupVariables } from './reactionGroupVariables'

const reactionStyles: ComponentSlotStylesInput<ReactionProps, ReactionGroupVariables> = {
  root: {},
  reaction: ({ variables: v }) => ({
    ':not(:last-child)': {
      marginRight: v.reactionSpacing,
    },
  }),
}

export default reactionStyles
