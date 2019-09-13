import { SiteVariablesPrepared } from '../../../types'

import { pxToRem } from '../../../../lib'

export interface SplitButtonVariables {
  borderRadius: string
  backgroundColorFocus: string
  boxShadow: string
  borderColor: string
  colorFocus: string
  primaryBackgroundColorFocus: string
  primaryColorFocus: string
  padding: string
  iconMargin: string
}

export default (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadius,
    backgroundColorFocus: siteVars.colors.grey[200],
    boxShadow: siteVars.shadowLevel1,
    borderColor: siteVars.colors.grey[200],
    colorFocus: siteVars.colors.grey[750],
    primaryBackgroundColorFocus: siteVars.colors.brand[800],
    primaryColorFocus: siteVars.colors.white,
    padding: `0 ${pxToRem(16)}`,
    iconMargin: `0 0 ${pxToRem(8)} 0`,
  }
}
