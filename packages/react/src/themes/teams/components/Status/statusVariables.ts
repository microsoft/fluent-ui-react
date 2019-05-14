import { pxToRem } from '../../../../lib'
import { SiteVariablesInput } from 'src/themes/types'

export interface StatusVariables {
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

  backgroundRed: string
  backgroundOrange: string
  backgroundYellow: string
  backgroundGreen: string
  backgroundBlue: string
  backgroundViolet: string

  smallest: string
  smaller: string
  small: string
  medium: string
  large: string
  larger: string
  largest: string
}

export default (siteVariables: SiteVariablesInput): StatusVariables => ({
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

  backgroundRed: siteVariables.errorStatusBackgroundColor,
  backgroundOrange: siteVariables.warningStatusBackgroundColor,
  // TODO: support real site variables colors here
  backgroundYellow: 'yellow',
  backgroundGreen: siteVariables.successStatusBackgroundColor,
  backgroundBlue: siteVariables.infoStatusBackgroundColor,
  // TODO: support real site variables colors here
  backgroundViolet: 'violet',

  smallest: pxToRem(8),
  smaller: pxToRem(8),
  small: pxToRem(8),
  medium: pxToRem(10),
  large: pxToRem(12),
  larger: pxToRem(14),
  largest: pxToRem(16),
})
