import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'

export default (siteVars: any): Partial<DividerVariables> => ({
  // TODO will be fixed after color scheme for dark theme is added
  // colors: {
  //   primary: siteVars.brand06,
  // },
  textColor: siteVars.colors.grey.dark02,
})
