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

  defaultBackgroundColor: string
  verticalSubmenuPrimaryBorderShorthand: string,
  verticalSubmenuItemPadding: string,
  verticalSubmenuBoxShadow: string,
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

    primaryFocusedColor: siteVars.colors.white,
    primaryFocusedBackgroundColor: siteVars.colors.primary[200],

    primaryBorderColor: siteVars.gray10,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    disabledColor: siteVars.gray06,

    lineHeightBase: siteVars.lineHeightMedium,

    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)} ${pxToRem(14)} ${pxToRem(18)}`,

    defaultBackgroundColor: siteVars.white,
    verticalSubmenuPrimaryBorderShorthand: `none`,
    verticalSubmenuItemPadding: `${pxToRem(9)} ${pxToRem(16)} ${pxToRem(9)} ${pxToRem(16)}`,
    verticalSubmenuBoxShadow: siteVars.shadowLevel1,
  }
}
