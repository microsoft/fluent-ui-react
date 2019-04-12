import { InputVariables } from '../../../teams/components/Input/inputVariables'

export default (siteVars: any): Partial<InputVariables> => {
  return {
    backgroundColor: siteVars.colors.grey[600],
    fontColor: siteVars.colors.grey[250],
    inputFocusBorderBottomColor: siteVars.colors.primary[600],
    iconColor: siteVars.colors.grey[250],
    placeholderColor: siteVars.colors.grey[250],
  }
}
