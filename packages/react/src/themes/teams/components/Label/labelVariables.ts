import { pxToRem, getColorSchemeWithCustomDefaults } from '../../../../lib'
import { ColorValues, ColorScheme, SiteVariablesPrepared } from '../../../types'

type LabelColorScheme = Pick<ColorScheme, 'foreground' | 'background'>

export interface LabelVariables {
  colorScheme: ColorValues<LabelColorScheme>
  circularRadius: string
  padding: { [name: string]: string }
  startPaddingLeft: string
  endPaddingRight: string
  margin: string
  height: { [name: string]: string }
  iconColor: string

  badgeHeight: string
  badgeLineheight: string
  badgeColor: string
  badgeBackgroundColor: string
  badgeBorderRadius: string
  badgePadding: string
  badgePaddingWithoutdetail: string
  badgePaddingWithoutIcon: string
  badgeIconMargin: string
  detailBorderColor: string
  detailLeftBorder: string
  detailMarginLeft: string
  detailPaddingLeft: string
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const color = 'rgba(0, 0, 0, 0.6)'

  return {
    colorScheme: getColorSchemeWithCustomDefaults(siteVars.colorScheme, {
      foreground: color,
      background: 'rgb(232, 232, 232)',
    }),
    circularRadius: pxToRem(9999),
    padding: {
      mini: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
      tiny: `0 ${pxToRem(6)} 0 ${pxToRem(6)}`,
      small: `0 ${pxToRem(8)} 0 ${pxToRem(8)}`,
      medium: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
      large: `0 ${pxToRem(12)} 0 ${pxToRem(12)}`,
      big: `0 ${pxToRem(14)} 0 ${pxToRem(14)}`,
      huge: `0 ${pxToRem(16)} 0 ${pxToRem(16)}`,
      massive: `0 ${pxToRem(18)} 0 ${pxToRem(18)}`,
    },
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    margin: `0 ${pxToRem(2)}`,
    height: {
      mini: `${pxToRem(20)}`,
      tiny: `${pxToRem(24)}`,
      small: `${pxToRem(28)}`,
      medium: `${pxToRem(32)}`,
      large: `${pxToRem(36)}`,
      big: `${pxToRem(40)}`,
      huge: `${pxToRem(44)}`,
      massive: `${pxToRem(48)}`,
    },

    // variables for 'icon' part
    iconColor: color,

    // Label type: Badge
    badgeHeight: pxToRem(24),
    badgeLineheight: pxToRem(24),
    badgeColor: siteVars.colors.black,
    badgeBackgroundColor: siteVars.gray10,
    badgeBorderRadius: pxToRem(2),
    badgePadding: `0 ${pxToRem(8)}`,
    badgePaddingWithoutdetail: `0 ${pxToRem(10)} 0 ${pxToRem(8)}`,
    badgePaddingWithoutIcon: `0 ${pxToRem(10)}`,
    badgeIconMargin: pxToRem(5),
    detailBorderColor: siteVars.gray06,
    detailLeftBorder: `solid ${pxToRem(1)}`,
    detailMarginLeft: pxToRem(6),
    detailPaddingLeft: pxToRem(6),
  }
}
