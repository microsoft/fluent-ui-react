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
  meReactingColor: siteVars.colors.primary[500],
  meReactingColorHover: siteVars.brand04,
  otherReactingColor: siteVars.gray03,
  otherReactingColorHover: siteVars.colors.grey[900],
  contentFontSize: siteVars.fontSizes.small,
  fontWeightHover: siteVars.fontWeightBold,
  outlineColorFocus: siteVars.colors.primary[500],
  outlineWidthFocus: pxToRem(2),
  outlineOffsetFocus: pxToRem(-2),
  meReacting: false,
  boxShadowColor: siteVars.colors.white,
  borderColorFocus: siteVars.colors.grey[900],
})
