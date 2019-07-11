import { TooltipContentVariables } from '../../../teams/components/Tooltip/tooltipContentVariables'

export default (siteVars): Partial<TooltipContentVariables> => ({
  boxShadowColor: undefined,
  color: siteVars.colors.black,
  backgroundColor: siteVars.colors.white,
})
