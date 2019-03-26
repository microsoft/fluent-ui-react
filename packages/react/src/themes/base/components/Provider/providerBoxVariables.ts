export interface ProviderBoxVariables {
  background: string
  color: string
}

export default (siteVariables): ProviderBoxVariables => ({
  background: siteVariables.bodyBackground,
  color: siteVariables.bodyColor,
})
