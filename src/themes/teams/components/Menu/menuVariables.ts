import { teamsPxToRem } from '../../utils'

export interface IMenuVariables {
  defaultColor: string
  defaultBackgroundColor: string

  defaultActiveColor: string
  defaultActiveBackgroundColor: string
  defaultBorderColor: string

  typePrimaryActiveColor: string
  typePrimaryActiveBackgroundColor: string
  typePrimaryActiveBorderColor: string

  typePrimaryBorderColor: string
  typePrimaryHoverBorderColor: string
  typePrimaryUnderlinedBorderColor: string

  iconsMenuItemSize?: string
  circularRadius: string
  lineHeightBase: string
}

export default (siteVars: any): IMenuVariables => {
  return {
    defaultColor: siteVars.gray02,
    defaultBackgroundColor: 'transparent',

    defaultActiveColor: siteVars.black,
    defaultActiveBackgroundColor: siteVars.gray10,
    defaultBorderColor: siteVars.gray08,

    typePrimaryActiveColor: siteVars.white,
    typePrimaryActiveBackgroundColor: siteVars.brand08,
    typePrimaryActiveBorderColor: siteVars.brand,

    typePrimaryBorderColor: siteVars.brand08,
    typePrimaryHoverBorderColor: siteVars.gray08,
    typePrimaryUnderlinedBorderColor: siteVars.gray08,

    iconsMenuItemSize: teamsPxToRem(32),
    circularRadius: teamsPxToRem(999),
    lineHeightBase: siteVars.lineHeightBase,
  }
}
