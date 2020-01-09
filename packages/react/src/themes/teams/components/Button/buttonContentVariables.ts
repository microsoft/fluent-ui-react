import { FontWeightProperty } from 'csstype'

export interface ButtonContentVariables {
  fontWeight: FontWeightProperty
  fontSize: string
  lineHeight: string

  sizeSmallFontSize: string
  sizeSmallLineHeight: string
}

export default (siteVars: any): ButtonContentVariables => ({
  fontSize: siteVars.fontSizes.medium,
  fontWeight: siteVars.fontWeightSemibold,
  lineHeight: siteVars.lineHeightMedium,

  sizeSmallFontSize: siteVars.fontSizes.small,
  sizeSmallLineHeight: siteVars.lineHeightSmall,
})
