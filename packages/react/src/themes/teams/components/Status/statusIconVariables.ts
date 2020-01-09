export interface StatusIconVariables {
  successTextColor: string
  infoTextColor: string
  warningTextColor: string
  errorTextColor: string
  defaultTextColor: string
}

export default (siteVariables): StatusIconVariables => ({
  successTextColor: siteVariables.colors.white,
  infoTextColor: siteVariables.colors.white,
  warningTextColor: siteVariables.colors.white,
  errorTextColor: siteVariables.colors.white,
  defaultTextColor: siteVariables.colors.white,
})
