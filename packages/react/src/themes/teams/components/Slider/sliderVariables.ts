import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'
import { SliderVariables as BaseSliderVariables } from '../../../base/components/Slider/sliderVariables'

export type SliderVariables = Partial<BaseSliderVariables>

export default (siteVars: SiteVariablesPrepared): SliderVariables => {
  const { colorScheme } = siteVars

  return {
    height: pxToRem(16),
    length: pxToRem(320),

    iconColor: colorScheme.default.foreground1,
    disabledIconColor: colorScheme.default.foregroundDisabled1,
    iconSize: pxToRem(16),
    iconSpace: pxToRem(12),

    railColor: colorScheme.default.border,
    disabledRailColor: colorScheme.default.backgroundDisabled1,
    railHeight: pxToRem(2),

    thumbColor: colorScheme.default.foreground2,
    activeThumbColor: colorScheme.default.foreground1,
    disabledThumbColor: colorScheme.default.foregroundDisabled1,
    thumbHeight: pxToRem(10),
    activeThumbHeight: pxToRem(14),
    thumbBorderPadding: pxToRem(4),
    thumbWidth: pxToRem(10),
    activeThumbWidth: pxToRem(14),

    trackColor: colorScheme.brand.foregroundActive,
    disabledTrackColor: colorScheme.default.foregroundDisabled1,
  }
}
