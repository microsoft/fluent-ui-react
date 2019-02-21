import { pxToRem } from '../../../../lib'

export interface MenuVariables {
  color: string
  activeColor: string
  activeBackgroundColor: string
  selectedBackgroundColor: string

  verticalBackgroundColor: string
  dividerHeight: string
  borderWidth: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.accessibleYellow,
    selectedBackgroundColor: siteVars.accessibleCyan,

    verticalBackgroundColor: siteVars.colors.black,

    dividerHeight: pxToRem(2),
    borderWidth: pxToRem(2),
  }
}
