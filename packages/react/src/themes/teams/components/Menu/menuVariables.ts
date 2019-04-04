import { pxToRem } from '../../../../lib'

export interface MenuVariables {
  color: string
  borderColor: string
  verticalBorderColor: string

  focusedBorder: string
  focusedOutline: string
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

  verticalBackgroundColor: string
  verticalItemPadding: string
  verticalBoxShadow: string
  verticalDividerMargin: string
  verticalItemBorder: string

  pointingIndicatorBackgroundColor: string

  underlinedBottomBorderWidth: string

  dividerHeight: string
  borderWidth: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.gray02,
    borderColor: siteVars.gray08,
    verticalBorderColor: siteVars.gray08,

    focusedBorder: `solid ${pxToRem(1)} ${siteVars.colors.white}`,
    focusedOutline: `solid ${pxToRem(1)} ${siteVars.colors.black}`,
    focusedBackgroundColor: siteVars.gray09,

    hoverBackgroundColor: siteVars.gray14,

    activeColor: siteVars.colors.black,
    activeBackgroundColor: siteVars.gray10,
    iconOnlyActiveColor: siteVars.colors.primary[500],

    primaryActiveColor: siteVars.colors.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.colors.primary[500],

    primaryFocusedColor: siteVars.colors.white,
    primaryFocusedBackgroundColor: siteVars.colors.primary[200],

    primaryBorderColor: siteVars.gray10,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    disabledColor: siteVars.gray06,
    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,

    verticalBackgroundColor: siteVars.colors.white,
    verticalItemPadding: `${pxToRem(9)} ${pxToRem(16)} ${pxToRem(9)} ${pxToRem(16)}`,
    verticalBoxShadow: siteVars.shadowLevel3,
    verticalDividerMargin: `${pxToRem(8)} 0`,
    verticalItemBorder: `solid ${pxToRem(2)} transparent`,

    pointingIndicatorBackgroundColor: siteVars.colors.primary[500],

    underlinedBottomBorderWidth: pxToRem(2),

    dividerHeight: pxToRem(1),
    borderWidth: pxToRem(1),
  }
}
