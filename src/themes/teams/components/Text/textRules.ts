import {
  atMentionTextColor,
  disabledTextColor,
  errorTextColor,
  successTextColor,
  timestampTextColor,
  textExtraSmallFontSize,
  textExtraSmallLineHeight,
  textSmallFontSize,
  textSmallLineHeight,
  textMediumFontSize,
  textMediumLineHeight,
  textLargeFontSize,
  textLargeLineHeight,
  textExtraLargeFontSize,
  textExtraLargeLineHeight,
  textX2FontSize,
  textX2LineHeight,
  textX3FontSize,
  textX3LineHeight,
  textX4FontSize,
  textX4LineHeight,
} from '../../siteVariables'

import { Sizes } from '../../../../lib/enums'
import { truncateStyle } from '../../../../styles/customCSS'
import { ITextVariables } from './textVariables'

export interface TextRulesParams {
  props: any
  variables: ITextVariables
}

export default {
  root: ({
    props: { atMention, disabled, error, size, important, success, timestamp, truncated },
    variables: v,
  }: TextRulesParams) => ({
    ...(truncated && truncateStyle),
    ...(atMention && { color: atMentionTextColor }),
    ...(disabled && { color: disabledTextColor }),
    ...(error && { color: errorTextColor }),
    ...(success && { color: successTextColor }),
    ...(timestamp && { color: timestampTextColor }),
    ...(important && { fontWeight: v.importantWeight }),
    ...(size === Sizes.ExtraSmall && {
      fontSize: textExtraSmallFontSize,
      lineHeight: textExtraSmallLineHeight,
    }),
    ...(size === Sizes.Small && {
      fontSize: textSmallFontSize,
      lineHeight: textSmallLineHeight,
    }),
    ...(size === Sizes.Medium && {
      fontSize: textMediumFontSize,
      lineHeight: textMediumLineHeight,
    }),
    ...(size === Sizes.Large && {
      fontSize: textLargeFontSize,
      lineHeight: textLargeLineHeight,
    }),
    ...(size === Sizes.ExtraLarge && {
      fontSize: textExtraLargeFontSize,
      lineHeight: textExtraLargeLineHeight,
    }),
    ...(size === Sizes['2x'] && {
      fontSize: textX2FontSize,
      lineHeight: textX2LineHeight,
    }),
    ...(size === Sizes['3x'] && {
      fontSize: textX3FontSize,
      lineHeight: textX3LineHeight,
    }),
    ...(size === Sizes['4x'] && {
      fontSize: textX4FontSize,
      lineHeight: textX4LineHeight,
    }),
  }),
}
