import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'

export default (siteVars: any): Partial<DividerVariables> => ({
  // TODO will be fixed after color scheme for high contrast is added
  // colors: {
  //   primary: siteVars.white,
  // },
  dividerColor: siteVars.white,
  textColor: siteVars.white,
})
