export interface PopupVariables {
  zIndex: number
  contentColor: string
  contentBackgroundColor: string
}

export default (siteVars: any): PopupVariables => ({
  zIndex: 1000,
  contentColor: siteVars.bodyColor,
  contentBackgroundColor: siteVars.bodyBackground,
})
