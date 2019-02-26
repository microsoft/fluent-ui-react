import { pxToRem } from '../../../../lib'
import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  verticalBorderColor: siteVars.black,

  focusedBorder: `solid ${pxToRem(1)} ${siteVars.colors.white}`,
  focusedBackgroundColor: 'transparent',

  hoverBackgroundColor: siteVars.gray08,

  activeColor: siteVars.colors.white,
  activeBackgroundColor: siteVars.gray08,

  verticalBackgroundColor: siteVars.gray10,

  dividerHeight: pxToRem(1),
  borderWidth: pxToRem(1),
  verticalBorderWidth: pxToRem(2),
  verticalDividerHeight: pxToRem(2),
})
