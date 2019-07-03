import { TooltipVariables } from '../../../teams/components/Tooltip/tooltipVariables'

export default (siteVars: any): Partial<TooltipVariables> => ({
  contentColor: siteVars.colors.black,
  contentBackgroundColor: siteVars.colors.white,
})
