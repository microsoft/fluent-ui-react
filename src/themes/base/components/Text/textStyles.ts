import * as _ from 'lodash'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { TextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'

export default {
  root: ({
    props: {
      atMention,
      color,
      disabled,
      error,
      important,
      size,
      success,
      temporary,
      timestamp,
      truncated,
      weight,
    },
    variables: v,
  }: ComponentStyleFunctionParam<TextProps, TextVariables>): ICSSInJSStyle => {
    return {
      display: 'inline-block',
      ...(atMention === true && {
        color: v.atMentionOtherColor,
      }),
      ...(atMention === 'me' && {
        color: v.atMentionMeColor,
      }),
      ...(truncated && { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
      ...(color && { color: _.get(v.colors, color) }),
      ...(disabled && { color: v.disabledColor }),
      ...(error && { color: v.errorColor }),
      ...(success && { color: v.successColor }),
      ...(important && { color: v.importantColor }),
      ...(temporary && { fontStyle: 'italic' }),
      ...(timestamp && { color: v.timestampColor }),

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

      ...(size === 'smallest' && {
        fontSize: v.fontSizeSmallest,
        lineHeight: v.fontLineHeightSmallest,
      }),
      ...(size === 'smaller' && {
        fontSize: v.fontSizeSmaller,
        lineHeight: v.fontLineHeightSmaller,
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
        fontSize: v.fontSizeLarger,
        lineHeight: v.fontLineHeightLarger,
      }),
      ...(size === 'largest' && {
        fontSize: v.fontSizeLargest,
        lineHeight: v.fontLineHeightLargest,
      }),
    }
  },
}
