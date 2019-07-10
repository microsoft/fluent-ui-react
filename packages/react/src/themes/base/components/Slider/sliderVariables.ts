import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'

export interface SliderVariables {
  height: React.CSSProperties['height']
  length: React.CSSProperties['width']

  iconColor: React.CSSProperties['color']
  disabledIconColor: React.CSSProperties['color']
  iconSize: string
  iconSpace: string

  railColor: React.CSSProperties['color']
  railHeight: React.CSSProperties['width']
  disabledRailColor: React.CSSProperties['color']

  thumbColor: React.CSSProperties['color']
  activeThumbColor: React.CSSProperties['color']
  disabledThumbColor: React.CSSProperties['color']
  thumbHeight: React.CSSProperties['height']
  activeThumbHeight: React.CSSProperties['height']
  thumbBorderPadding: React.CSSProperties['padding']
  thumbWidth: React.CSSProperties['width']
  activeThumbWidth: React.CSSProperties['width']

  trackColor: React.CSSProperties['color']
  disabledTrackColor: React.CSSProperties['color']
}

export default (siteVars: SiteVariablesPrepared): SliderVariables => {
  const { colors } = siteVars

  return {
    height: pxToRem(16),
    length: pxToRem(130),

    iconColor: colors.grey[700],
    disabledIconColor: colors.grey[200],
    iconSize: pxToRem(16),
    iconSpace: pxToRem(12),

    railColor: colors.grey[300],
    disabledRailColor: colors.grey[200],
    railHeight: pxToRem(2),

    thumbColor: colors.grey[700],
    activeThumbColor: colors.grey[700],
    disabledThumbColor: colors.grey[200],
    thumbHeight: pxToRem(10),
    activeThumbHeight: pxToRem(10),
    thumbBorderPadding: 0,
    thumbWidth: pxToRem(10),
    activeThumbWidth: pxToRem(10),

    trackColor: colors.grey[500],
    disabledTrackColor: colors.grey[200],
  }
}
