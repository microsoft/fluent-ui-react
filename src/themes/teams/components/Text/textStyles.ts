import { Sizes } from '../../../../lib/enums'
import { ICSSInJSStyle } from '../../../../../types/theme'
import { truncateStyle } from '../../../../styles/customCSS'

const textStyles = {
  root: ({ props, variables, siteVariables }): ICSSInJSStyle => ({
    ...(props.truncated && truncateStyle),
    ...(props.atMention && { color: siteVariables.atMentionTextColor }),
    ...(props.disabled && { color: siteVariables.disabledTextColor }),
    ...(props.error && { color: siteVariables.errorTextColor }),
    ...(props.success && { color: siteVariables.successTextColor }),
    ...(props.timestamp && { color: siteVariables.timestampTextColor }),
    ...(props.important && { fontWeight: variables.importantWeight }),
    ...(props.size === Sizes.ExtraSmall && {
      fontSize: siteVariables.textExtraSmallFontSize,
      lineHeight: siteVariables.textExtraSmallLineHeight,
    }),
    ...(props.size === Sizes.Small && {
      fontSize: siteVariables.textSmallFontSize,
      lineHeight: siteVariables.textSmallLineHeight,
    }),
    ...(props.size === Sizes.Medium && {
      fontSize: siteVariables.textMediumFontSize,
      lineHeight: siteVariables.textMediumLineHeight,
    }),
    ...(props.size === Sizes.Large && {
      fontSize: siteVariables.textLargeFontSize,
      lineHeight: siteVariables.textLargeLineHeight,
    }),
    ...(props.size === Sizes.ExtraLarge && {
      fontSize: siteVariables.textExtraLargeFontSize,
      lineHeight: siteVariables.textExtraLargeLineHeight,
    }),
    ...(props.size === Sizes['2x'] && {
      fontSize: siteVariables.textX2FontSize,
      lineHeight: siteVariables.textX2LineHeight,
    }),
    ...(props.size === Sizes['3x'] && {
      fontSize: siteVariables.textX3FontSize,
      lineHeight: siteVariables.textX3LineHeight,
    }),
    ...(props.size === Sizes['4x'] && {
      fontSize: siteVariables.textX4FontSize,
      lineHeight: siteVariables.textX4LineHeight,
    }),
  }),
}

export default textStyles
