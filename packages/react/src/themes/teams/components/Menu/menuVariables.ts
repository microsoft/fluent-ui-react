import { pxToRem } from '../../../../lib'

export interface MenuVariables {

  color: string
  borderColor: string

  focusedBorder: string
  focusedBackgroundColor: string

  hoverBackgroundColor: string

  activeColor: string
  activeBackgroundColor: string
  iconOnlyActiveColor: string

  primaryActiveColor: string
  primaryActiveBackgroundColor: string
  primaryActiveBorderColor: string

  primaryFocusedColor: string
  primaryFocusedBackgroundColor: string

  primaryBorderColor: string
  primaryHoverBorderColor: string
  primaryUnderlinedBorderColor: string

  disabledColor: string
  lineHeightBase: string
  horizontalPadding: string

  verticalMenuBackgroundColor: string
  verticalMenuItemPadding: string,
  verticalMenuBoxShadow: string,

  menuDividerHeight: string
  menuBorderWidth: string,
}

export default (siteVars: any): MenuVariables => {
  return {

    color: siteVars.gray02,
    borderColor: siteVars.gray08,

    focusedBorder: `solid ${pxToRem(1)} ${siteVars.gray03}`,
    focusedBackgroundColor: siteVars.gray14,

    hoverBackgroundColor: siteVars.gray14,

    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.gray10,
    iconOnlyActiveColor: siteVars.brand06,

    primaryActiveColor: siteVars.colors.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.colors.primary[500],

    primaryFocusedColor: siteVars.white,
    primaryFocusedBackgroundColor: siteVars.brand12,

    primaryBorderColor: siteVars.gray10,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    disabledColor: siteVars.gray06,
    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,

    verticalMenuBackgroundColor: siteVars.colors.white,
    verticalMenuItemPadding: `${pxToRem(9)} ${pxToRem(16)} ${pxToRem(9)} ${pxToRem(16)}`,
    verticalMenuBoxShadow: siteVars.shadowLevel3,

    menuDividerHeight: pxToRem(1),
    menuBorderWidth: pxToRem(1),
  }
}
