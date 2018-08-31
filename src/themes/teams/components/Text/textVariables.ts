import { textWeightSemibold, textWeightBold } from '../../siteVariables'

export interface ITextVariables {
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
    atMentionTextColor: siteVariables.atMentionTextColor,
    disabledTextColor: siteVariables.disabledTextColor,
    errorTextColor: siteVariables.errorTextColor,
    successTextColor: siteVariables.successTextColor,
    timestampTextColor: siteVariables.timestampTextColor,
    timestampHoverTextColor: siteVariables.gray02,
    textExtraSmallFontSize: siteVariables.textExtraSmallFontSize,
    textExtraSmallLineHeight: siteVariables.textExtraSmallLineHeight,
    textSmallFontSize: siteVariables.textSmallFontSize,
    textSmallLineHeight: siteVariables.textSmallLineHeight,
    textMediumFontSize: siteVariables.textMediumFontSize,
    textMediumLineHeight: siteVariables.textMediumLineHeight,
    textLargeFontSize: siteVariables.textLargeFontSize,
    textLargeLineHeight: siteVariables.textLargeLineHeight,
    textExtraLargeFontSize: siteVariables.textExtraLargeFontSize,
    textExtraLargeLineHeight: siteVariables.textExtraLargeLineHeight,
    textX2FontSize: siteVariables.textX2FontSize,
    textX2LineHeight: siteVariables.textX2LineHeight,
    textX3FontSize: siteVariables.textX3FontSize,
    textX3LineHeight: siteVariables.textX3LineHeight,
    textX4FontSize: siteVariables.textX4FontSize,
    textX4LineHeight: siteVariables.textX4LineHeight,
    importantWeight: 600,
    textWeightLight: siteVariables.textWeightLight,
    textWeightSemilight: siteVariables.textWeightSemilight,
    textWeightRegular: siteVariables.textWeightRegular,
    textWeightSemibold: siteVariables.textWeightSemibold,
    textWeightBold: siteVariables.textWeightBold,
  }
}
