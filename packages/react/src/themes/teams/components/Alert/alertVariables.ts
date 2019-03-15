import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from 'src/themes/types'

export interface AlertVariables {
  borderRadius: string
  backgroundColor: string
  borderColor: string
  color: string
  fontWeight: FontWeightProperty
  padding: string
}

export default (siteVars: SiteVariablesPrepared): AlertVariables => {
  const { colors } = siteVars

  return {
    borderRadius: pxToRem(3),
    backgroundColor: colors.grey[50], // $app-white
    borderColor: colors.grey[500], // $app-gray02
    color: colors.grey[800], // $app-black
    fontWeight: siteVars.fontWeightSemibold,
    padding: pxToRem(5),
  }
}
