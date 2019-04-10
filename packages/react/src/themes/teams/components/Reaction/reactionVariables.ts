import { pxToRem } from '../../../../lib'

export interface ReactionVariables {
  meReactingColor: string
  meReactingColorHover: string
  otherReactingColor: string
  otherReactingColorHover: string
  contentFontSize: string
  fontWeightHover: string
  outlineColorFocus: string
  outlineWidthFocus: string
  outlineOffsetFocus: string
  meReacting: boolean
  borderColorFocus: string
  boxShadowColor: string
}

export default (siteVars): ReactionVariables => ({
  meReactingColor: siteVars.colors.primary[600],
  meReactingColorHover: siteVars.colors.primary[800],
  otherReactingColor: siteVars.colors.grey[450],
  otherReactingColorHover: siteVars.colors.grey[750],
  contentFontSize: siteVars.fontSizes.small,
  fontWeightHover: siteVars.fontWeightBold,
  outlineColorFocus: siteVars.colors.primary[600],
  outlineWidthFocus: pxToRem(2),
  outlineOffsetFocus: pxToRem(-2),
  meReacting: false,
  boxShadowColor: siteVars.colors.white,
  borderColorFocus: siteVars.colors.grey[750],
})
