export interface PopupVariables {
  zIndex: number
  contentBorderRadius: string
  contentColor: string
  contentBackgroundColor: string
}

export default (siteVars: any): PopupVariables => ({
  zIndex: 1000,
  contentBorderRadius: '3px',
  contentColor: siteVars.bodyColor,
  contentBackgroundColor: siteVars.bodyBackground,
})
