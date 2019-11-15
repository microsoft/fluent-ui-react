import { SiteVariablesPrepared } from '../../../types'
import { pxToRem } from '../../../../lib'

export interface SplitButtonVariables {
  borderRadius: string
  borderColorPrimary: string
  borderColor: string
  smallDimension: string
  smallPadding: string
  smallMinWidth: string
  smallBoxShadow: string
}

export default (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadius,
    borderColorPrimary: siteVars.colors.brand[500],
    borderColor: siteVars.colorScheme.default.border,
    smallDimension: pxToRem(24),
    smallPadding: `0 ${pxToRem(8)}`,
    smallMinWidth: '0',
    smallBoxShadow: 'none',
  }
}
