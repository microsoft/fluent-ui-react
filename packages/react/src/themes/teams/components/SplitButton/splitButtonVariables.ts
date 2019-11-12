import { SiteVariablesPrepared } from '../../../types'

export interface SplitButtonVariables {
  borderRadius: string
  borderColorPrimary: string
  borderColor: string
}

export default (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadius,
    borderColorPrimary: siteVars.colors.brand[500],
    borderColor: siteVars.colorScheme.default.border,
  }
}
