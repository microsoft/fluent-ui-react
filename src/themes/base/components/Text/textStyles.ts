import * as _ from 'lodash'
import { ComponentStyleFunctionParam, ICSSInJSStyle } from '../../../types'
import { truncateStyle } from '../../customCSS'
import { TextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'

export default {
  root: ({
    props: { color, disabled, error, size, weight, success, truncated },
    variables: v,
  }: ComponentStyleFunctionParam<TextProps, TextVariables>): ICSSInJSStyle => {
    return {
      display: 'inline-block',
      ...(truncated && truncateStyle),
      ...(color && { color: _.get(v.colors, color) }),
      ...(disabled && { color: v.disabledColor }),
      ...(error && { color: v.errorColor }),
      ...(success && { color: v.successColor }),

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
