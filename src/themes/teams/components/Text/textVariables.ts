export interface TextVariables {
  atMentionMeColor: string
  atMentionMeFontWeight: number
  atMentionOtherColor: string
  disabledColor: string
  errorColor: string
  importantColor: string
  importantWeight: number
  successColor: string
  timestampColor: string
  timestampHoverColor: string

  fontSizeExtraSmall: string
  fontLineHeightExtraSmall: number
  fontSizeSmall: string
  fontLineHeightSmall: number
  fontSizeMedium: string
  fontLineHeightMedium: number
  fontSizeLarge: string
  fontLineHeightLarge: number
  fontSizeExtraLarge: string
  fontLineHeightExtraLarge: number

  fontWeightLight: number
  fontWeightSemilight: number
  fontWeightRegular: number
  fontWeightSemibold: number
  fontWeightBold: number
}

export default (siteVariables): TextVariables => {
  return {
    atMentionOtherColor: siteVariables.brand06,
    atMentionMeColor: siteVariables.orange04,
    atMentionMeFontWeight: siteVariables.fontWeightBold,
    disabledColor: siteVariables.gray06,
    errorColor: siteVariables.red,
    importantWeight: siteVariables.fontWeightBold,
    importantColor: siteVariables.red,
    successColor: siteVariables.green04,
    timestampColor: siteVariables.gray04,
    timestampHoverColor: siteVariables.gray02,

    fontSizeExtraSmall: siteVariables.fontSizes.smaller,
    fontLineHeightExtraSmall: siteVariables.lineHeightExtraSmall,

    fontSizeSmall: siteVariables.fontSizes.small,
    fontLineHeightSmall: siteVariables.lineHeightSmall,

    fontSizeMedium: siteVariables.fontSizes.medium,
    fontLineHeightMedium: siteVariables.lineHeightBase,

    fontSizeLarge: siteVariables.fontSizes.large,
    fontLineHeightLarge: siteVariables.lineHeightSmall,

    fontSizeExtraLarge: siteVariables.fontSizes.larger,
    fontLineHeightExtraLarge: siteVariables.lineHeightSmall,

    fontWeightLight: siteVariables.fontWeightLight,
    fontWeightSemilight: siteVariables.fontWeightSemilight,
    fontWeightRegular: siteVariables.fontWeightRegular,
    fontWeightSemibold: siteVariables.fontWeightSemibold,
    fontWeightBold: siteVariables.fontWeightBold,
  }
}
