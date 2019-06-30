export interface TooltipVariables {
  zIndex: number
  contentColor: string
  contentBackgroundColor: string
}

export default (siteVars: any): TooltipVariables => ({
  zIndex: 1000,
  contentColor: siteVars.colorScheme.default.foreground3,
  contentBackgroundColor: siteVars.colors.grey[500],
})
