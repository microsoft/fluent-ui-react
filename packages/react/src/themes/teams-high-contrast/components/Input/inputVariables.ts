import { InputVariables } from '../../../base/components/Input/inputVariables'

export default (siteVars: any): Partial<InputVariables> => {
  return {
    backgroundColor: siteVars.bodyBackground,
    borderColor: siteVars.bodyColor,
    fontColor: siteVars.bodyColor,
    iconColor: siteVars.bodyColor,
    inputFocusBorderColor: `transparent transparent ${siteVars.accessibleYellow} transparent`,
  }
}
