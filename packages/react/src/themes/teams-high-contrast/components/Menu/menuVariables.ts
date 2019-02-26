import { pxToRem } from '../../../../lib'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  color: siteVars.white,
  activeColor: siteVars.black,
  focusedBackgroundColor: siteVars.accessibleYellow,
  activeBackgroundColor: siteVars.accessibleCyan,

  verticalBackgroundColor: siteVars.colors.black,

  dividerHeight: pxToRem(2),
  verticalDividerHeight: pxToRem(2),
  borderWidth: pxToRem(1),
  verticalBorderWidth: pxToRem(2),
})
