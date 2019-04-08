import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'

export default (siteVars: any): Partial<DividerVariables> => ({
  colorScheme: {
    ...siteVars.colorScheme,
    primary: {
      foregroundDefault: siteVars.colors.primary[400],
      borderDefault: siteVars.colors.primary[400],
    },
  },
  textColor: siteVars.colors.grey[250],
  dividerColor: siteVars.colors.grey[550],
})
