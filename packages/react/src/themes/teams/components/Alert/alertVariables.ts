import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from 'src/themes/types'

export interface AlertVariables {
  border: string
  borderRadius: string
  backgroundColor: string
  borderColor: string
  color: string
  fontWeight: FontWeightProperty
  minHeight: string
  padding: string

  actionSize: string
  actionColor: string
}

export default (siteVars: SiteVariablesPrepared): AlertVariables => {
  const alertHeight = 28
  const borderSize = 1

  return {
    border: `${pxToRem(borderSize)} solid`,
    borderRadius: pxToRem(3),
    backgroundColor: siteVars.colors.grey[50], // $app-white
    borderColor: siteVars.gray06,
    color: siteVars.gray02,
    fontWeight: siteVars.fontWeightSemibold,
    minHeight: pxToRem(alertHeight),
    padding: `0 0 0 ${pxToRem(16)}`,

    actionSize: pxToRem(alertHeight - 2 * borderSize),
    actionColor: undefined,
  }
}
