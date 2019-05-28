import { ToolbarVariables } from '../../../teams/components/Toolbar/toolbarVariables'
import { colors } from '../../../teams/colors'

export default (siteVars: any): Partial<ToolbarVariables> => ({
  foreground: siteVars.colors.grey[250],
  dividerBorder: siteVars.colors.grey[450],
  foregroundHover: siteVars.colors.brand[400],
  foregroundActive: siteVars.colors.brand[400],
  foregroundDisabled: colors.grey[450],
  borderHover: siteVars.colors.brand[400],
})
