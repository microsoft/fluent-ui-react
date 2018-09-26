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
}

export default (siteVariables): ITextVariables => {
  return {
    atMentionTextColor: siteVariables.orange04,
    disabledTextColor: siteVariables.gray06,
    errorTextColor: siteVariables.red,
    successTextColor: siteVariables.green04,
    timestampTextColor: siteVariables.gray04,
    timestampHoverTextColor: siteVariables.gray02,

    textExtraSmallFontSize: siteVariables.fontSizes.smaller,
    textExtraSmallLineHeight: siteVariables.lineHeightExtraSmall,

    textSmallFontSize: siteVariables.fontSizes.small,
    textSmallLineHeight: siteVariables.lineHeightSmall,

    textMediumFontSize: siteVariables.fontSizes.medium,
    textMediumLineHeight: siteVariables.lineHeightBase,

    textLargeFontSize: siteVariables.fontSizes.large,
    textLargeLineHeight: siteVariables.lineHeightSmall,

    textExtraLargeFontSize: siteVariables.fontSizes.larger,
    textExtraLargeLineHeight: siteVariables.lineHeightSmall,

    importantWeight: siteVariables.fontWeightBold,
    importantTextColor: siteVariables.red,

    textWeightLight: siteVariables.fontWeightLight,
    textWeightSemilight: siteVariables.fontWeightSemilight,
    textWeightRegular: siteVariables.fontWeightRegular,
    textWeightSemibold: siteVariables.fontWeightSemibold,
    textWeightBold: siteVariables.fontWeightBold,
  }
}
