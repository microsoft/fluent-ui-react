import { ReactionVariables } from '../../../teams/components/Reaction/reactionVariables'

export default (siteVars: any): Partial<ReactionVariables> => ({
  meReactingColor: siteVars.colors.primary[400],
  meReactingColorHover: siteVars.colors.primary[300],
  otherReactingColor: siteVars.colors.grey[300],
  otherReactingColorHover: siteVars.colors.white,
})
