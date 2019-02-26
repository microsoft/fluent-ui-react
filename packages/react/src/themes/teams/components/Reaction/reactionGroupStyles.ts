import { ComponentSlotStylesInput } from '../../../types'
import { ReactionProps } from '@stardust-ui/react'
import { ReactionGroupVariables } from 'src/themes/teams/components/Reaction/reactionGroupVariables'

const reactionStyles: ComponentSlotStylesInput<ReactionProps, ReactionGroupVariables> = {
  root: {},
  reaction: ({ variables: v }) => ({
    ':not(:last-child)': {
      marginRight: v.reactionSpacing,
    },
  }),
}

export default reactionStyles
