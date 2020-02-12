import { ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles'
import { TeamsTextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'
import { getColorSchemeKey } from '../../colors'
import translateAlignProp from '../../../../styles/translateAlignProp'

export type TextStylesProps = Pick<
  TextProps,
  | 'atMention'
  | 'color'
  | 'important'
  | 'timestamp'
  | 'truncated'
  | 'disabled'
  | 'error'
  | 'success'
  | 'temporary'
  | 'align'
  | 'weight'
  | 'size'
>

export default {
  root: ({
    props: p,
    variables: v,
  }: ComponentStyleFunctionParam<TextStylesProps, TeamsTextVariables>): ICSSInJSStyle => {
    const colors = v.colorScheme[getColorSchemeKey(p.color)]
    return {
      ...(p.color && { color: colors.foreground }),
      ...(p.atMention === true && { color: v.atMentionOtherColor }),
      ...(p.truncated && { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
      ...(p.disabled && { color: v.disabledColor }),
      ...(p.error && { color: v.errorColor }),
      ...(p.success && { color: v.successColor }),
      ...(p.temporary && { fontStyle: 'italic' }),
      ...(p.align && { display: 'block', textAlign: translateAlignProp(p.align) }), // textAlign makes sense only for block elements

      ...(p.weight === 'light' && { fontWeight: v.fontWeightLight }),
      ...(p.weight === 'semilight' && { fontWeight: v.fontWeightSemilight }),
      ...(p.weight === 'regular' && { fontWeight: v.fontWeightRegular }),
      ...(p.weight === 'semibold' && { fontWeight: v.fontWeightSemibold }),
      ...(p.weight === 'bold' && { fontWeight: v.fontWeightBold }),

      ...(p.size === 'smallest' && {
        fontSize: v.fontSizeSmallest,
        lineHeight: v.fontLineHeightSmallest,
      }),
      ...(p.size === 'smaller' && {
        fontSize: v.fontSizeSmaller,
        lineHeight: v.fontLineHeightSmaller,
      }),
      ...(p.size === 'small' && {
        fontSize: v.fontSizeSmall,
        lineHeight: v.fontLineHeightSmall,
      }),
      ...(p.size === 'medium' && {
        fontSize: v.fontSizeMedium,
        lineHeight: v.fontLineHeightMedium,
      }),
      ...(p.size === 'large' && {
        fontSize: v.fontSizeLarge,
        lineHeight: v.fontLineHeightLarge,
      }),
      ...(p.size === 'larger' && {
        fontSize: v.fontSizeLarger,
        lineHeight: v.fontLineHeightLarger,
      }),
      ...(p.size === 'largest' && {
        fontSize: v.fontSizeLargest,
        lineHeight: v.fontLineHeightLargest,
      }),
      ...(p.atMention === 'me' && {
        color: v.atMentionMeColor,
        fontWeight: v.atMentionMeFontWeight,
      }),
      ...(p.timestamp && {
        color: v.timestampColor,
        ':hover': { color: v.timestampHoverColor },
      }),
      ...(p.important && {
        color: v.importantColor,
        fontWeight: v.importantWeight,
      }),
    }
  },
}
