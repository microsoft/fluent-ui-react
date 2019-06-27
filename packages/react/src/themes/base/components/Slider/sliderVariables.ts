import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'

type SliderCSSVariables = Required<Pick<React.CSSProperties, 'height' | 'width'>>

export interface SliderVariables extends SliderCSSVariables {
  iconColor: React.CSSProperties['color']
  disabledIconColor: React.CSSProperties['color']
  iconSize: string
  iconSpace: string
  thumbColor: React.CSSProperties['color']
  activeThumbColor: React.CSSProperties['color']
  disabledThumbColor: React.CSSProperties['color']
  thumbHeight: React.CSSProperties['height']
  activeThumbHeight: React.CSSProperties['height']
  thumbPadding: React.CSSProperties['padding']
  thumbWidth: React.CSSProperties['width']
  activeThumbWidth: React.CSSProperties['width']
  trackColor: React.CSSProperties['color']
  trackColorRight: React.CSSProperties['color']
  disabledTrackColor: React.CSSProperties['color']
  trackWidth: React.CSSProperties['width']
}

export default (siteVars: SiteVariablesPrepared): SliderVariables => {
  const { colors } = siteVars

  return {
    height: pxToRem(16),
    width: pxToRem(130),

    iconColor: colors.grey[700],
    disabledIconColor: colors.grey[200],
    iconSize: pxToRem(16),
    iconSpace: pxToRem(12),

    thumbColor: colors.grey[700],
    activeThumbColor: colors.grey[700],
    disabledThumbColor: colors.grey[200],
    thumbHeight: pxToRem(10),
    activeThumbHeight: pxToRem(10),
    thumbPadding: 0,
    thumbWidth: pxToRem(10),
    activeThumbWidth: pxToRem(10),

    trackColor: colors.grey[500],
    trackColorRight: colors.grey[300],
    disabledTrackColor: colors.grey[200],
    trackWidth: pxToRem(2),
  }
}
