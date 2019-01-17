import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface TextVariables {
  colors: ColorValues<string>

  atMentionMeColor: string
  atMentionOtherColor: string
  importantColor: string
  timestampColor: string

  disabledColor: string
  errorColor: string
  successColor: string

  fontSizeExtraSmall: string
  fontSizeSmall: string
  fontSizeMedium: string
  fontSizeLarge: string
  fontSizeExtraLarge: string

  fontLineHeightExtraSmall: number
  fontLineHeightSmall: number
  fontLineHeightMedium: number
  fontLineHeightLarge: number
  fontLineHeightExtraLarge: number

  fontWeightLight: number
  fontWeightSemilight: number
  fontWeightRegular: number
  fontWeightSemibold: number
  fontWeightBold: number
}

export default (siteVariables): TextVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),

    atMentionMeColor: siteVariables.colors.pink[500],
    atMentionOtherColor: siteVariables.colors.grey[600],
    importantColor: siteVariables.colors.red[500],
    timestampColor: siteVariables.colors.grey[500],

    disabledColor: siteVariables.colors.grey[300],
    errorColor: siteVariables.colors.red[500],
    successColor: siteVariables.colors.green[500],

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
