import { InputVariables } from '../../../base/components/Input/inputVariables'
import { pxToRem } from '../../../../lib'

export default (siteVars): Partial<InputVariables> => ({
  borderColor: 'transparent',
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  backgroundColor: siteVars.gray10,

  fontColor: siteVars.gray02,
  fontSize: siteVars.fontSizes.medium,

  iconColor: siteVars.bodyColor,
  inputFocusBorderColor: `transparent transparent ${siteVars.colors.primary[500]} transparent`,
  inputFocusBorderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  placeholderColor: siteVars.gray02,
})
