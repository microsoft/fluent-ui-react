import { ToolbarVariables } from '../../../teams/components/Toolbar/toolbarVariables'

export default (siteVars: any): Partial<ToolbarVariables> => ({
  foreground: siteVars.colors.white,
  dividerBorder: siteVars.colors.white,

  foregroundHover: siteVars.colors.black,
  backgroundHover: siteVars.accessibleYellow,

  foregroundActive: siteVars.accessibleYellow,

  foregroundDisabled: siteVars.accessibleGreen,

  borderWidth: '0',
  borderRadius: undefined,
})
