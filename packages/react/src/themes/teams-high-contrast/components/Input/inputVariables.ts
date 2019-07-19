import { InputVariables } from '../../../base/components/Input/inputVariables'
import { pxToRem } from '../../../../lib'

export default (siteVars: any): Partial<InputVariables> => {
  return {
    borderColor: siteVars.bodyColor,
    borderWidth: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(2)} ${pxToRem(1)}`,
    inputFocusBorderColor: `transparent transparent ${siteVars.accessibleYellow} transparent`,
  }
}
