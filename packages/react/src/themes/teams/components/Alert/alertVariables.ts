import { FontWeightProperty } from 'csstype'

import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared } from '../../../types'

export interface AlertVariables {
  borderStyle: string
  borderWidth: string
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
  const minHeight = pxToRem(28)

  return {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: pxToRem(3),
    backgroundColor: siteVars.colors.grey[50], // $app-white
    borderColor: siteVars.gray06,
    color: siteVars.gray02,
    fontWeight: siteVars.fontWeightRegular,
    minHeight,
    padding: `0 0 0 ${pxToRem(16)}`,

    actionSize: minHeight,
    actionColor: undefined,
  }
}
