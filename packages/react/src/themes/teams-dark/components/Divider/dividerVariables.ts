import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'

export default (siteVars: any): Partial<DividerVariables> => ({
  colorScheme: {
    ...siteVars.colorScheme,
    primary: {
      foregroundDefault: siteVars.brand06,
      borderDefault: siteVars.brand06,
    },
  },
  textColor: siteVars.colors.grey.dark02,
  dividerColor: siteVars.colors.grey.dark09,
})
