import { pxToRem } from 'src/lib'

export interface ReactionGroupVariables {
  reactionSpacing: string
}

export default (): ReactionGroupVariables => ({
  reactionSpacing: pxToRem(8),
})
