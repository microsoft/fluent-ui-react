import { pxToRem } from '../../../../lib'

export interface ReactionGroupVariables {
  reactionSpacing: string
}

export default (): ReactionGroupVariables => ({
  reactionSpacing: pxToRem(8),
})
