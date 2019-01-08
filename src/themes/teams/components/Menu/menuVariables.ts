import { pxToRem } from '../../utils'

export interface MenuVariables {
  color: string
  backgroundColor: string

  activeColor: string
  activeBackgroundColor: string
  focusedBackgroundColor: string
  borderColor: string

  primaryActiveColor: string
  primaryActiveBackgroundColor: string
  primaryActiveBorderColor: string

  primaryFocusedColor: string
  primaryFocusedBackgroundColor: string

  primaryBorderColor: string
  primaryHoverBorderColor: string
  primaryUnderlinedBorderColor: string

  circularRadius: string
  lineHeightBase: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.gray02,
    backgroundColor: siteVars.white,

    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.gray10,
    focusedBackgroundColor: siteVars.gray14,
    borderColor: siteVars.gray08,

    primaryActiveColor: siteVars.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.brand,

    primaryFocusedColor: siteVars.white,
    primaryFocusedBackgroundColor: siteVars.brand12,

    primaryBorderColor: siteVars.brand08,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    circularRadius: pxToRem(999),
    lineHeightBase: siteVars.lineHeightBase,
  }
}
