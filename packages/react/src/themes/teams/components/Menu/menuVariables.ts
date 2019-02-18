import { pxToRem } from '../../../../lib'

export interface MenuVariables {
  color: string

  activeColor: string
  activeBackgroundColor: string
  focusedBackgroundColor: string
  borderColor: string

  iconOnlyActiveColor: string
  primaryActiveColor: string
  primaryActiveBackgroundColor: string
  primaryActiveBorderColor: string

  primaryFocusedColor: string
  primaryFocusedBackgroundColor: string
  primaryFocusedBorder: string

  primaryBorderColor: string
  primaryHoverBorderColor: string
  primaryUnderlinedBorderColor: string

  disabledColor: string

  lineHeightBase: string

  horizontalPadding: string

  verticalMenuBackgroundColor: string
  verticalMenuItemPadding: string,
  verticalMenuBoxShadow: string,
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.gray02,
    iconOnlyActiveColor: siteVars.brand06,
    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.gray10,
    focusedBackgroundColor: siteVars.gray14,
    borderColor: siteVars.gray08,

    primaryActiveColor: siteVars.colors.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.colors.primary[500],

    primaryFocusedColor: siteVars.white,
    primaryFocusedBackgroundColor: siteVars.brand12,
    primaryFocusedBorder: `solid ${pxToRem(1)} ${siteVars.gray03}`,

    primaryBorderColor: siteVars.gray10,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    disabledColor: siteVars.gray06,

    lineHeightBase: siteVars.lineHeightMedium,

    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,

    verticalMenuBackgroundColor: siteVars.colors.white,
    verticalMenuItemPadding: `${pxToRem(9)} ${pxToRem(16)} ${pxToRem(9)} ${pxToRem(16)}`,
    verticalMenuBoxShadow: siteVars.shadowLevel3,
  }
}
