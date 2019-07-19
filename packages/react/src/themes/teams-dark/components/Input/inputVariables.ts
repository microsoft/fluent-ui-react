import { InputVariables } from '../../../base/components/Input/inputVariables'

export default (siteVars: any): Partial<InputVariables> => {
  return {
    inputFocusBorderColor: `transparent transparent ${siteVars.colors.brand[600]} transparent`,
  }
}
