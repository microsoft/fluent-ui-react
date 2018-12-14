import { Partial } from 'types/utils'

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

export default (siteVariables): Partial<TextVariables> => {
  return {
    atMentionOtherColor: siteVariables.blue,
    atMentionMeColor: siteVariables.red,
    atMentionMeFontWeight: siteVariables.fontWeightBold,
    disabledColor: siteVariables.grey,
    errorColor: siteVariables.red,
    importantWeight: siteVariables.fontWeightBold,
    importantColor: siteVariables.red,
    successColor: siteVariables.green,

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
