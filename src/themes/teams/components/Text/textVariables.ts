export interface ITextVariables {
  importantTextColor: string
  importantWeight: number
  textWeightLight: number
  textWeightSemilight: number
  textWeightRegular: number
  textWeightSemibold: number
  textWeightBold: number
  atMentionTextColor: string
  disabledTextColor: string
  errorTextColor: string
  successTextColor: string
  timestampTextColor: string
  textExtraSmallFontSize: string
  textExtraSmallLineHeight: string
  textSmallFontSize: string
  textSmallLineHeight: string
  textMediumFontSize: string
  textMediumLineHeight: string
  textLargeFontSize: string
  textLargeLineHeight: string
  textExtraLargeFontSize: string
  textExtraLargeLineHeight: string
  textX2FontSize: string
  textX2LineHeight: string
  textX3FontSize: string
  textX3LineHeight: string
  textX4FontSize: string
  textX4LineHeight: string
}

export default (siteVariables): ITextVariables => {
  return {
    atMentionTextColor: siteVariables.orange04,
    disabledTextColor: siteVariables.gray06,
    errorTextColor: siteVariables.red,
    successTextColor: siteVariables.green04,
    timestampTextColor: siteVariables.gray04,
    importantTextColor: siteVariables.red,
    importantWeight: siteVariables.fontWeightBold,

    textExtraSmallFontSize: siteVariables.fontSizeExtraSmall,
    textExtraSmallLineHeight: siteVariables.lineHeightSmall,
    textSmallFontSize: siteVariables.fontSizeSmall,
    textSmallLineHeight: siteVariables.lineHeightBase,
    textMediumFontSize: siteVariables.fontSizeBase,
    textMediumLineHeight: siteVariables.lineHeightLarge,
    textLargeFontSize: siteVariables.fontSizeLarge,
    textLargeLineHeight: siteVariables.lineHeightBase,
    textExtraLargeFontSize: siteVariables.fontSizeExtraLarge,
    textExtraLargeLineHeight: siteVariables.lineHeightBase,
    textX2FontSize: siteVariables.fontSizeExtraLarge,
    textX2LineHeight: siteVariables.lineHeightBase,
    textX3FontSize: siteVariables.fontSizeExtraLarge,
    textX3LineHeight: siteVariables.lineHeightBase,
    textX4FontSize: siteVariables.fontSizeExtraLarge,
    textX4LineHeight: siteVariables.lineHeightBase,

    textWeightLight: siteVariables.fontWeightLight,
    textWeightSemilight: siteVariables.fontWeightSemilight,
    textWeightRegular: siteVariables.fontWeightRegular,
    textWeightSemibold: siteVariables.fontWeightSemibold,
    textWeightBold: siteVariables.fontWeightBold,
  }
}
