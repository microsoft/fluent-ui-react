import { InputVariables } from '../../../base/components/Input/inputVariables'
import { pxToRem } from '../../../../lib'

export default (siteVars): Partial<InputVariables> => ({
  borderColor: 'transparent',
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  backgroundColor: siteVars.colorScheme.default.background2,
  backgroundColorInverted: siteVars.colorScheme.default.background,

  fontColor: siteVars.colorScheme.default.foreground,
  fontSize: siteVars.fontSizes.medium,

  iconColor: siteVars.colorScheme.default.foreground,
  inputFocusBorderColor: `transparent transparent ${siteVars.colorScheme.brand.borderFocus1} transparent`,
  inputFocusBorderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  placeholderColor: siteVars.colorScheme.default.foreground1,
})
