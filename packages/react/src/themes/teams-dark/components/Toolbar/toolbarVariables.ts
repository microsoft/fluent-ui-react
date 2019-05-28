import { ToolbarVariables } from '../../../teams/components/Toolbar/toolbarVariables'

export default (siteVars: any): Partial<ToolbarVariables> => ({
  foreground: siteVars.colors.grey[250],
  dividerBorder: siteVars.colors.grey[450],
  foregroundHover: siteVars.colors.brand[400],
  borderHover: siteVars.colors.brand[400],
})
