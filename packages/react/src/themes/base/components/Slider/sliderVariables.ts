import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'

export interface SliderVariables {
  height: string
  length: string

  railColor: string
  railHeight: string
  disabledRailColor: string

  thumbColor: string
  activeThumbColor: string
  disabledThumbColor: string
  thumbHeight: string
  activeThumbHeight: string
  thumbBorderPadding: string
  thumbWidth: string
  activeThumbWidth: string

  trackColor: string
  disabledTrackColor: string
}

export default (siteVars: SiteVariablesPrepared): SliderVariables => {
  const { colors } = siteVars

  return {
    height: pxToRem(16),
    length: pxToRem(130),

    railColor: colors.grey[300],
    disabledRailColor: colors.grey[200],
    railHeight: pxToRem(2),

    thumbColor: colors.grey[700],
    activeThumbColor: colors.grey[700],
    disabledThumbColor: colors.grey[200],
    thumbHeight: pxToRem(10),
    activeThumbHeight: pxToRem(10),
    thumbBorderPadding: '0',
    thumbWidth: pxToRem(10),
    activeThumbWidth: pxToRem(10),

    trackColor: colors.grey[500],
    disabledTrackColor: colors.grey[200],
  }
}
