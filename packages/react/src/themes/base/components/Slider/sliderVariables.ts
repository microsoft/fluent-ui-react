import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'

export interface SliderVariables {
  heightDEP: React.CSSProperties['height']
  height: React.CSSProperties['width']
  length: React.CSSProperties['width']
  color: React.CSSProperties['color']
  colorRight: React.CSSProperties['color']
  disabledColor: React.CSSProperties['color']
  disabledColorRight: React.CSSProperties['color']
  iconColor: React.CSSProperties['color']
  disabledIconColor: React.CSSProperties['color']
  iconSize: string
  iconSpace: string
  thumbColor: React.CSSProperties['color']
  activeThumbColor: React.CSSProperties['color']
  disabledThumbColor: React.CSSProperties['color']
  thumbHeight: React.CSSProperties['height']
  activeThumbHeight: React.CSSProperties['height']
  thumbBorderPadding: React.CSSProperties['padding']
  thumbWidth: React.CSSProperties['width']
  activeThumbWidth: React.CSSProperties['width']
}

export default (siteVars: SiteVariablesPrepared): SliderVariables => {
  const { colors } = siteVars

  return {
    heightDEP: pxToRem(16),
    length: pxToRem(130),
    height: pxToRem(2),

    color: colors.grey[500],
    colorRight: colors.grey[300],
    disabledColor: colors.grey[200],
    disabledColorRight: colors.grey[200],

    iconColor: colors.grey[700],
    disabledIconColor: colors.grey[200],
    iconSize: pxToRem(16),
    iconSpace: pxToRem(12),

    thumbColor: colors.grey[700],
    activeThumbColor: colors.grey[700],
    disabledThumbColor: colors.grey[200],
    thumbHeight: pxToRem(10),
    activeThumbHeight: pxToRem(10),
    thumbBorderPadding: 0,
    thumbWidth: pxToRem(10),
    activeThumbWidth: pxToRem(10),
  }
}
