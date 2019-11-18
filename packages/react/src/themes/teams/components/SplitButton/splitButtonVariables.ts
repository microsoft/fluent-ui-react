import { SiteVariablesPrepared } from '../../../types'
import { pxToRem } from '../../../../lib'

export interface SplitButtonVariables {
  borderRadius: string
  borderColorPrimary: string
  borderColor: string
  borderColorDisabled: string
  borderWidthLeftOnly: string
  smallDimension: string
  smallPadding: string
  smallMinWidth: string
  smallBoxShadow: string
  padding: string
}

export default (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadius,
    borderColor: siteVars.colorScheme.default.border,
    borderColorPrimary: siteVars.colors.brand[500],
    borderColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    borderWidthLeftOnly: '0 0 0 .1rem',
    smallDimension: pxToRem(24),
    smallPadding: `0 ${pxToRem(8)}`,
    smallMinWidth: '0',
    smallBoxShadow: 'none',
    padding: `0 ${pxToRem(16)}`,
  }
}
