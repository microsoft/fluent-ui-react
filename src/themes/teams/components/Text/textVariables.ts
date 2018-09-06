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
  timestampHoverTextColor: string
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
    timestampHoverTextColor: siteVariables.gray02,

    textExtraSmallFontSize: siteVariables.fontSizeExtraSmall,
    textExtraSmallLineHeight: siteVariables.lineHeightExtraSmall,

    textSmallFontSize: siteVariables.fontSizeSmall,
    textSmallLineHeight: siteVariables.lineHeightSmall,

    textMediumFontSize: siteVariables.fontSizeMedium,
    textMediumLineHeight: siteVariables.lineHeightBase,

    textLargeFontSize: siteVariables.fontSizeLarge,
    textLargeLineHeight: siteVariables.lineHeightSmall,

    textExtraLargeFontSize: siteVariables.fontSizeExtraLarge,
    textExtraLargeLineHeight: siteVariables.lineHeightSmall,

    textX2FontSize: siteVariables.fontSizeX2,
    textX2LineHeight: siteVariables.lineHeightSmall,

    textX3FontSize: siteVariables.fontSizeX3,
    textX3LineHeight: siteVariables.lineHeightSmall,

    textX4FontSize: siteVariables.fontSizeX4,
    textX4LineHeight: siteVariables.lineHeightSmall,

    importantWeight: siteVariables.fontWeightBold,
    importantTextColor: siteVariables.red,

    textWeightLight: siteVariables.fontWeightLight,
    textWeightSemilight: siteVariables.fontWeightSemilight,
    textWeightRegular: siteVariables.fontWeightRegular,
    textWeightSemibold: siteVariables.fontWeightSemibold,
    textWeightBold: siteVariables.fontWeightBold,
  }
}
