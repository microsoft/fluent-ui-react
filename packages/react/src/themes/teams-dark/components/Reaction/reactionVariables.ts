import { ReactionVariables } from '../../../teams/components/Reaction/reactionVariables'

export default (siteVars: any): Partial<ReactionVariables> => ({
  meReactingColor: siteVars.brand06,
  otherReactingColorHover: siteVars.black,
})
