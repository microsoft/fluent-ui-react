import { pxToRem } from '../../../../lib'

export interface MenuVariables {
  color: string
  activeColor: string
  focusedBackgroundColor: string
  activeBackgroundColor: string

  verticalBackgroundColor: string
  dividerHeight: string
  borderWidth: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
    activeColor: siteVars.black,
    focusedBackgroundColor: siteVars.accessibleYellow,
    activeBackgroundColor: siteVars.accessibleCyan,

    verticalBackgroundColor: siteVars.colors.black,

    dividerHeight: pxToRem(2),
    borderWidth: pxToRem(2),
  }
}
