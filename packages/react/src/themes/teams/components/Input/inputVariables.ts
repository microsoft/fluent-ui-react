import { InputVariables } from '../../../base/components/Input/inputVariables'
import { pxToRem } from '../../../../lib'

export default (siteVars): Partial<InputVariables> => ({
  borderColor: 'transparent',
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  backgroundColor: siteVars.colors.grey[100],

  fontColor: siteVars.colors.grey[500],
  fontSize: siteVars.fontSizes.medium,

  iconColor: siteVars.bodyColor,
  inputFocusBorderColor: `transparent transparent ${siteVars.colors.primary[600]} transparent`,
  inputFocusBorderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  placeholderColor: siteVars.colors.grey[500],
})
