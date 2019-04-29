import { MenuVariables } from '../../../teams/components/Menu/menuVariables'
// import { extendColorObject } from 'src/index'

export default (siteVars: any): Partial<MenuVariables> => ({
  // colorScheme: extendColorObject(siteVars.colorSchemeWIP, {
  //   primary: {
  //     foregroundActive: siteVars.colors.white,
  //     // backgroundFocus: siteVars.colors.primary[300],
  //   },
  // }),
  color: siteVars.colors.white,
  colorActive: siteVars.colors.black,
  backgroundColorFocus: siteVars.accessibleYellow,
  backgroundColorActive: siteVars.accessibleCyan,
  primaryBorderColor: siteVars.colors.white,

  verticalBackgroundColor: siteVars.colors.black,
})
