import { ReactionVariables } from '../../../teams/components/Reaction/reactionVariables'

export default (siteVars: any): Partial<ReactionVariables> => ({
  meReactingColor: siteVars.brand06,
  meReactingColorHover: siteVars.brand04,
  otherReactingColor: siteVars.gray03,
  otherReactingColorHover: siteVars.colors.white,
})
