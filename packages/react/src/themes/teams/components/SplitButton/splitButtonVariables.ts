import { SiteVariablesPrepared } from '../../../types'

export interface SplitButtonVariables {
  borderRadius: string
  backgroundColorFocus: string
  boxShadow: string
  borderColor: string
  colorFocus: string
}

export default (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadius,
    backgroundColorFocus: siteVars.colors.grey[200],
    boxShadow: siteVars.shadowLevel1,
    borderColor: siteVars.colors.grey[200],
    colorFocus: siteVars.colors.grey[750],
  }
}
