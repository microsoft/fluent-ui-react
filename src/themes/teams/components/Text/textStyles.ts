import { Sizes, Weights } from '../../../../lib/enums'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../../../types/theme'
import { truncateStyle } from '../../../../styles/customCSS'
import { ITextVariables } from './textVariables'
import { ITextProps } from '../../../../components/Text/Text'

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
  }: ComponentStyleFunctionParam<ITextProps, ITextVariables>): ICSSInJSStyle => {
    return {
      ...(truncated && truncateStyle),
      ...(atMention === true && {
        color: v.atMentionOtherColor,
      }),
      ...(atMention === 'me' && {
        color: v.atMentionMeColor,
        fontWeight: v.atMentionMeFontWeight,
      }),
      ...(disabled && { color: v.disabledColor }),
      ...(error && { color: v.errorColor }),
      ...(success && { color: v.successColor }),
      ...(temporary && { fontStyle: 'italic' }),
      ...(timestamp && {
        color: v.timestampColor,
        ':hover': {
          color: v.timestampHoverColor,
        },
      }),
      ...(important && {
        fontWeight: v.importantWeight,
        color: v.importantColor,
      }),

      ...(weight === Weights.Light && {
        fontWeight: v.fontWeightLight,
      }),
      ...(weight === Weights.Semilight && {
        fontWeight: v.fontWeightSemilight,
      }),
      ...(weight === Weights.Regular && {
        fontWeight: v.fontWeightRegular,
      }),
      ...(weight === Weights.Semibold && {
        fontWeight: v.fontWeightSemibold,
      }),
      ...(weight === Weights.Bold && {
        fontWeight: v.fontWeightBold,
      }),

      ...(size === Sizes.Smaller && {
        fontSize: v.fontSizeExtraSmall,
        lineHeight: v.fontLineHeightExtraSmall,
      }),
      ...(size === Sizes.Small && {
        fontSize: v.fontSizeSmall,
        lineHeight: v.fontLineHeightSmall,
      }),
      ...(size === Sizes.Medium && {
        fontSize: v.fontSizeMedium,
        lineHeight: v.fontLineHeightMedium,
      }),
      ...(size === Sizes.Large && {
        fontSize: v.fontSizeLarge,
        lineHeight: v.fontLineHeightLarge,
      }),
      ...(size === Sizes.Larger && {
        fontSize: v.fontSizeExtraLarge,
        lineHeight: v.fontLineHeightExtraLarge,
      }),
    }
  },
}
