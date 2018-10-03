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
    atMentionOtherTextColor: siteVariables.atMentionOtherTextColor,
    atMentionMeTextColor: siteVariables.atMentionMeTextColor,
    atMentionMeFontWeight: siteVariables.fontWeightBold,

    disabledTextColor: siteVariables.disabledTextColor,
    errorTextColor: siteVariables.errorTextColor,
    successTextColor: siteVariables.successTextColor,
    timestampTextColor: siteVariables.timestampTextColor,
    timestampHoverTextColor: siteVariables.timestampHoverTextColor,

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
    importantTextColor: siteVariables.importantTextColor,

    textWeightLight: siteVariables.fontWeightLight,
    textWeightSemilight: siteVariables.fontWeightSemilight,
    textWeightRegular: siteVariables.fontWeightRegular,
    textWeightSemibold: siteVariables.fontWeightSemibold,
    textWeightBold: siteVariables.fontWeightBold,
  }
}
