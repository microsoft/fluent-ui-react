export interface ChatContentVariables {
  color: string
  linkColor: string
  mineLinkColor: string
}

export default (siteVars): ChatContentVariables => ({
  color: siteVars.colors.grey[750],
  linkColor: siteVars.colorScheme.brand.foreground1,
  mineLinkColor: siteVars.colorScheme.brand.foreground2,
})
