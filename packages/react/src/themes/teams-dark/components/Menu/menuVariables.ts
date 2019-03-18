import { MenuVariables } from '../../../teams/components/Menu/menuVariables'

export default (siteVars: any): Partial<MenuVariables> => ({
  verticalBorderColor: siteVars.black,

  borderColor: siteVars.colors.white,
  backgroundColorFocus: 'transparent',

  backgroundColorHover: siteVars.colors.grey.dark08,

  colorActive: siteVars.colors.white,
  backgroundColorActive: siteVars.colors.grey.dark08,

  verticalBackgroundColor: siteVars.colors.grey.dark10,
})
