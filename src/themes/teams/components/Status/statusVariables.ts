export interface StatusVariables {
  borderColor: string
  borderWidth: number
  successBackgroundColor: string
  successTextColor: string
  infoBackgroundColor: string
  infoTextColor: string
  warningBackgroundColor: string
  warningTextColor: string
  errorBackgroundColor: string
  errorTextColor: string
  defaultBackgroundColor: string
  defaultTextColor: string
}

export default siteVariables => ({
  borderColor: undefined,
  borderWidth: 2,
  successBackgroundColor: siteVariables.successStatusBackgroundColor,
  successTextColor: siteVariables.successStatusTextColor,
  infoBackgroundColor: siteVariables.infoStatusBackgroundColor,
  infoTextColor: siteVariables.infoStatusTextColor,
  warningBackgroundColor: siteVariables.warningStatusBackgroundColor,
  warningTextColor: siteVariables.warningStatusTextColor,
  errorBackgroundColor: siteVariables.errorStatusBackgroundColor,
  errorTextColor: siteVariables.errorStatusTextColor,
  defaultBackgroundColor: siteVariables.unknownStatusBackgroundColor,
  defaultTextColor: siteVariables.unknownStatusTextColor,
})
