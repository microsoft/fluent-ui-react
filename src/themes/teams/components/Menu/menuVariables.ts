import { pxToRem } from '../../../../lib'

export interface MenuVariables {
  defaultColor: string
  defaultBackgroundColor: string

  defaultActiveColor: string
  defaultActiveBackgroundColor: string
  defaultBorderColor: string

  primaryActiveColor: string
  primaryActiveBackgroundColor: string
  primaryActiveBorderColor: string

  primaryBorderColor: string
  primaryHoverBorderColor: string
  primaryUnderlinedBorderColor: string

  circularRadius: string
  lineHeightBase: string
}

export default (siteVars: any): MenuVariables => {
  return {
    defaultColor: siteVars.gray02,
    defaultBackgroundColor: 'transparent',

    defaultActiveColor: siteVars.black,
    defaultActiveBackgroundColor: siteVars.gray10,
    defaultBorderColor: siteVars.gray08,

    primaryActiveColor: siteVars.white,
    primaryActiveBackgroundColor: siteVars.brand08,
    primaryActiveBorderColor: siteVars.brand,

    primaryBorderColor: siteVars.brand08,
    primaryHoverBorderColor: siteVars.gray08,
    primaryUnderlinedBorderColor: siteVars.gray08,

    circularRadius: pxToRem(999),
    lineHeightBase: siteVars.lineHeightBase,
  }
}
