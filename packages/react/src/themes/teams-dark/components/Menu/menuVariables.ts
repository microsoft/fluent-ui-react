import { pxToRem } from '../../../../lib'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  verticalBorderColor: siteVars.black,

  focusedBorder: `solid ${pxToRem(1)} ${siteVars.colors.white}`,
  focusedBackgroundColor: 'transparent',

  pointingIndicatorBackgroundColor: siteVars.brand06,

  hoverBackgroundColor: siteVars.gray08,

  activeColor: siteVars.colors.white,
  activeBackgroundColor: siteVars.gray08,

  verticalBackgroundColor: siteVars.gray10,
})
