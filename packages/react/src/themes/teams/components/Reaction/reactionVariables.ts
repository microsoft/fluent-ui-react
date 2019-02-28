export interface ReactionVariables {
  color: string
  colorHover: string
  contentFontSize: string
  fontWeightHover: string
}

export default (siteVars): ReactionVariables => ({
  color: siteVars.gray03,
  colorHover: siteVars.colors.grey[900],
  contentFontSize: siteVars.fontSizes.small,
  fontWeightHover: siteVars.fontWeightBold,
})
