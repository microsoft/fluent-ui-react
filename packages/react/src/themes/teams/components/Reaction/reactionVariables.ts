export interface ReactionVariables {
  color: string
  colorHover: string
  countFontSize: string
  fontWeightHover: string
}

export default (siteVars): ReactionVariables => ({
  color: siteVars.gray03,
  colorHover: siteVars.colors.grey[900],
  countFontSize: siteVars.fontSizes.small,
  fontWeightHover: siteVars.fontWeightBold,
})
