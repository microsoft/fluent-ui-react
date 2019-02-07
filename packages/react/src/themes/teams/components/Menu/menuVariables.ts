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

  primaryBorderColor: string
  primaryHoverBorderColor: string
  primaryUnderlinedBorderColor: string

  disabledColor: string

  lineHeightBase: string

  horizontalPadding: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.gray02,

    iconOnlyActiveColor: siteVars.colors.primary[500],

    activeColor: siteVars.colors.grey[900],
    activeBackgroundColor: siteVars.gray10,
    focusedBackgroundColor: siteVars.gray14,
    borderColor: siteVars.gray08,

    primaryActiveColor: siteVars.colors.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.colors.primary[500],

    primaryFocusedColor: siteVars.colors.white,
    primaryFocusedBackgroundColor: siteVars.colors.primary[200],

    primaryBorderColor: siteVars.brand08,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    disabledColor: siteVars.gray06,

    lineHeightBase: siteVars.lineHeightMedium,

    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,
  }
}
