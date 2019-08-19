import { InputVariables } from '../../../base/components/Input/inputVariables'
import { pxToRem } from '../../../../lib'

export default (siteVars: any): Partial<InputVariables> => {
  return {
    borderColor: siteVars.bodyColor,
    borderWidth: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(2)} ${pxToRem(1)}`,
    inputFocusBorderColor: `${siteVars.colors.white} ${siteVars.colors.white} ${siteVars.colorScheme.brand.borderFocus1} ${siteVars.colors.white}`,
  }
}
