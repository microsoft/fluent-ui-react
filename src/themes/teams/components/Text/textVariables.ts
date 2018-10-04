export interface ITextVariables {
  importantTextColor: string
  importantWeight: number
  textWeightLight: number
  textWeightSemilight: number
  textWeightRegular: number
  textWeightSemibold: number
  textWeightBold: number
  atMentionMeFontWeight: number
  atMentionMeTextColor: string
  atMentionOtherTextColor: string
  disabledTextColor: string
  errorTextColor: string
  successTextColor: string
  timestampTextColor: string
  timestampHoverTextColor: string
  textExtraSmallFontSize: string
  textExtraSmallLineHeight: number
  textSmallFontSize: string
  textSmallLineHeight: number
  textMediumFontSize: string
  textMediumLineHeight: number
  textLargeFontSize: string
  textLargeLineHeight: number
  textExtraLargeFontSize: string
  textExtraLargeLineHeight: number
}

export default (siteVariables): ITextVariables => {
  return {
    atMentionOtherTextColor: siteVariables.brand06,
    atMentionMeTextColor: siteVariables.orange04,
    atMentionMeFontWeight: siteVariables.fontWeightBold,

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
