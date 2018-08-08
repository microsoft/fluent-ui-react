import { Sizes } from '../../../../lib/enums'
import { truncateStyle } from '../../../../styles/customCSS'
import { ITextVariables } from './textVariables'

export interface TextStylesParams {
  props: any
  variables: ITextVariables
}

export default {
  root: ({
    props: { atMention, disabled, error, size, important, success, timestamp, truncated },
    variables: v,
  }: TextStylesParams) => {
    return {
      ...(truncated && truncateStyle),
      ...(atMention && { color: v.atMentionTextColor }),
      ...(disabled && { color: v.disabledTextColor }),
      ...(error && { color: v.errorTextColor }),
      ...(success && { color: v.successTextColor }),
      ...(timestamp && { color: v.timestampTextColor }),
      ...(important && { fontWeight: v.importantWeight }),
      ...(size === Sizes.ExtraSmall && {
        fontSize: v.textExtraSmallFontSize,
        lineHeight: v.textExtraSmallLineHeight,
      }),
      ...(size === Sizes.Small && {
        fontSize: v.textSmallFontSize,
        lineHeight: v.textSmallLineHeight,
      }),
      ...(size === Sizes.Medium && {
        fontSize: v.textMediumFontSize,
        lineHeight: v.textMediumLineHeight,
      }),
      ...(size === Sizes.Large && {
        fontSize: v.textLargeFontSize,
        lineHeight: v.textLargeLineHeight,
      }),
      ...(size === Sizes.ExtraLarge && {
        fontSize: v.textExtraLargeFontSize,
        lineHeight: v.textExtraLargeLineHeight,
      }),
      ...(size === Sizes['2x'] && {
        fontSize: v.textX2FontSize,
        lineHeight: v.textX2LineHeight,
      }),
      ...(size === Sizes['3x'] && {
        fontSize: v.textX3FontSize,
        lineHeight: v.textX3LineHeight,
      }),
      ...(size === Sizes['4x'] && {
        fontSize: v.textX4FontSize,
        lineHeight: v.textX4LineHeight,
      }),
    }
  },
}
