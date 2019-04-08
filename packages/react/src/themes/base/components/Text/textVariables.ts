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

  fontSizeSmallest: string
  fontSizeSmaller: string
  fontSizeSmall: string
  fontSizeMedium: string
  fontSizeLarge: string
  fontSizeLarger: string
  fontSizeLargest: string

  fontLineHeightSmallest: number
  fontLineHeightSmaller: number
  fontLineHeightSmall: number
  fontLineHeightMedium: number
  fontLineHeightLarge: number
  fontLineHeightLarger: number
  fontLineHeightLargest: number

  fontWeightLight: number
  fontWeightSemilight: number
  fontWeightRegular: number
  fontWeightSemibold: number
  fontWeightBold: number
}

export default (siteVariables, fontSizes): TextVariables => {
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

    fontSizeSmallest: fontSizes.smallest,
    fontLineHeightSmallest: siteVariables.lineHeightSmallest,

    fontSizeSmaller: fontSizes.smaller,
    fontLineHeightSmaller: siteVariables.lineHeightSmaller,

    fontSizeSmall: fontSizes.small,
    fontLineHeightSmall: siteVariables.lineHeightSmall,

    fontSizeMedium: fontSizes.medium,
    fontLineHeightMedium: siteVariables.lineHeightMedium,

    fontSizeLarge: fontSizes.large,
    fontLineHeightLarge: siteVariables.lineHeightLarge,

    fontSizeLarger: fontSizes.larger,
    fontLineHeightLarger: siteVariables.lineHeightLarger,

    fontSizeLargest: fontSizes.largest,
    fontLineHeightLargest: siteVariables.lineHeightLargest,

    fontWeightLight: siteVariables.fontWeightLight,
    fontWeightSemilight: siteVariables.fontWeightSemilight,
    fontWeightRegular: siteVariables.fontWeightRegular,
    fontWeightSemibold: siteVariables.fontWeightSemibold,
    fontWeightBold: siteVariables.fontWeightBold,
  }
}
