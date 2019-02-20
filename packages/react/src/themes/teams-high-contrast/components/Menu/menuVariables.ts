import { pxToRem } from '../../../../lib'

export interface MenuVariables {
  color: string
  activeColor: string
  activeBackgroundColor: string
  selectedBackgroundColor: string

  verticalMenuBackgroundColor: string
  menuDividerHeight: string
  menuBorderWidth: string
}

export default (siteVars: any): MenuVariables => {
  return {
    color: siteVars.white,
    activeColor: siteVars.black,
    activeBackgroundColor: siteVars.accessibleYellow,
    selectedBackgroundColor: siteVars.accessibleCyan,

    verticalMenuBackgroundColor: siteVars.colors.black,

    menuDividerHeight: pxToRem(2),
    menuBorderWidth: pxToRem(2),
  }
}
