import { pxToRem } from '../../../../lib'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  verticalBorderColor: siteVars.black,

  focusedBorder: `solid ${pxToRem(1)} ${siteVars.colors.white}`,
  focusedBackgroundColor: 'transparent',

  hoverBackgroundColor: siteVars.colors.grey.dark08,

  activeColor: siteVars.colors.white,
  activeBackgroundColor: siteVars.colors.grey.dark08,

  verticalBackgroundColor: siteVars.colors.grey.dark10,
})
