import { IconVariables } from '../../../teams/components/Icon/iconVariables'

export default (siteVars): Partial<IconVariables> => ({
  colorScheme: siteVars.colorScheme,
  disabledColor: siteVars.colors.grey.dark06,
})
