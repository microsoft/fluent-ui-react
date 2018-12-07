import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { truncateStyle } from '../../../../styles/customCSS'
import { TextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'

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
  }: ComponentStyleFunctionParam<TextProps, TextVariables>): ICSSInJSStyle => {
    return {
      display: 'inline-block',
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

      ...(weight === 'light' && {
        fontWeight: v.fontWeightLight,
      }),
      ...(weight === 'semilight' && {
        fontWeight: v.fontWeightSemilight,
      }),
      ...(weight === 'regular' && {
        fontWeight: v.fontWeightRegular,
      }),
      ...(weight === 'semibold' && {
        fontWeight: v.fontWeightSemibold,
      }),
      ...(weight === 'bold' && {
        fontWeight: v.fontWeightBold,
      }),

      ...(size === 'smaller' && {
        fontSize: v.fontSizeExtraSmall,
        lineHeight: v.fontLineHeightExtraSmall,
      }),
      ...(size === 'small' && {
        fontSize: v.fontSizeSmall,
        lineHeight: v.fontLineHeightSmall,
      }),
      ...(size === 'medium' && {
        fontSize: v.fontSizeMedium,
        lineHeight: v.fontLineHeightMedium,
      }),
      ...(size === 'large' && {
        fontSize: v.fontSizeLarge,
        lineHeight: v.fontLineHeightLarge,
      }),
      ...(size === 'larger' && {
        fontSize: v.fontSizeExtraLarge,
        lineHeight: v.fontLineHeightExtraLarge,
      }),
    }
  },
}
