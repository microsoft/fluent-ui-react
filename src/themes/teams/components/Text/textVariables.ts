import { mapColorsToScheme } from '../../../../lib'
import { TextVariables } from '../../../base/components/Text/textVariables'

export interface TeamsTextVariables extends TextVariables {
  atMentionMeColor: string
  atMentionMeFontWeight: number
  atMentionOtherColor: string
  importantColor: string
  importantWeight: number
  timestampColor: string
  timestampHoverColor: string
}

export default (siteVariables): TeamsTextVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),
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
