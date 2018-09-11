import { Sizes, Weights } from '../../../../lib/enums'
import { ICSSInJSStyle } from '../../../../../types/theme'
import { truncateStyle } from '../../../../styles/customCSS'
import { ITextVariables } from './textVariables'
import { ITextProps } from '../../../../components/Text/Text'

export interface TextStylesParams {
  props: ITextProps
  variables: ITextVariables
}

export default {
  root: ({
    props: {
      atMention,
      disabled,
      error,
      size,
      weight,
      important,
      success,
      timestamp,
      truncated,
      temporary,
    },
    variables: v,
  }: TextStylesParams): ICSSInJSStyle => {
    return {
      ...(truncated && truncateStyle),
      ...(atMention && { color: v.atMentionTextColor }),
      ...(disabled && { color: v.disabledTextColor }),
      ...(error && { color: v.errorTextColor }),
      ...(success && { color: v.successTextColor }),
      ...(temporary && { fontStyle: 'italic' }),
      ...(timestamp && {
        color: v.timestampTextColor,
        ':hover': {
          color: v.timestampHoverTextColor,
        },
      }),
      ...(weight === Weights.Light && {
        fontWeight: v.textWeightLight,
      }),
      ...(weight === Weights.Semilight && {
        fontWeight: v.textWeightSemilight,
      }),
      ...(weight === Weights.Regular && {
        fontWeight: v.textWeightRegular,
      }),
      ...(weight === Weights.Semibold && {
        fontWeight: v.textWeightSemibold,
      }),
      ...(weight === Weights.Bold && {
        fontWeight: v.textWeightBold,
      }),
      ...(important && {
        fontWeight: v.importantWeight,
        color: v.importantTextColor,
      }),
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
