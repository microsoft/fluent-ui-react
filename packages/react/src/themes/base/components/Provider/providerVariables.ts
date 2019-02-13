export interface ProviderVariables {
  background: string
  color: string
}

export default (siteVariables): ProviderVariables => ({
  background: siteVariables.bodyBackground,
  color: siteVariables.bodyColor,
})
