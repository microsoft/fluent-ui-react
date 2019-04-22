import { InputVariables } from '../../../base/components/Input/inputVariables'
import { pxToRem } from '../../../../lib'

export default (siteVars): Partial<InputVariables> => ({
  borderColor: 'transparent',
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  backgroundColor: siteVars.gray10,

  fontColor: siteVars.gray02,
  fontSize: siteVars.fontSizes.medium,

  iconColor: siteVars.bodyColor,
  inputFocusBorderColor: `transparent transparent ${siteVars.colors.primary[500]} transparent`,
  placeholderColor: siteVars.gray02,
})
