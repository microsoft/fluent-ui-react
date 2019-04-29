import { InputVariables } from '../../../base/components/Input/inputVariables'

export default (siteVars: any): Partial<InputVariables> => {
  return {
    backgroundColor: siteVars.colors.grey[600],
    fontColor: siteVars.colors.grey[250],
    inputFocusBorderColor: `transparent transparent ${siteVars.colors.primary[600]} transparent`,
    iconColor: siteVars.colors.grey[250],
    placeholderColor: siteVars.colors.grey[250],
  }
}
