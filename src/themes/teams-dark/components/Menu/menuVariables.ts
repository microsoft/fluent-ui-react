import { pxToRem } from 'src/lib'

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

  submenuIndicatorContent: string
  submenuIndicatorRotationAngle: number
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.gray02,
    backgroundColor: siteVars.black,

    activeColor: siteVars.white,
    activeBackgroundColor: siteVars.gray02,
    focusedBackgroundColor: siteVars.gray14,
    borderColor: siteVars.gray02,

    primaryActiveColor: siteVars.black,
    primaryActiveBackgroundColor: siteVars.brand02,
    primaryActiveBorderColor: siteVars.brand,

    primaryFocusedColor: siteVars.black,
    primaryFocusedBackgroundColor: siteVars.brand12,

    primaryBorderColor: siteVars.brand08,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    circularRadius: pxToRem(999),
    lineHeightBase: siteVars.lineHeightBase,

    submenuIndicatorContent: '">"',
    submenuIndicatorRotationAngle: 90,
  }
}
