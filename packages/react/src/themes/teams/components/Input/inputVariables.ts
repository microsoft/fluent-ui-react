import { pxToRem } from '../../../../utils'

export interface InputVariables {
  backgroundColor: string
  backgroundColorInverted: string
  borderColor: string
  borderRadius: string
  borderWidth: string
  fontColor: string
  fontSize: string
  iconColor: string
  iconPosition: string
  iconRight: string
  iconLeft: string
  inputPaddingWithIconAtStart: string
  inputPaddingWithIconAtEnd: string
  inputPadding: string
  inputFocusBorderColor: string
  inputFocusBorderRadius: string
  placeholderColor: string
}

export default (siteVars): InputVariables => ({
  iconPosition: 'absolute',
  iconRight: pxToRem(10),
  iconLeft: pxToRem(6),
  inputPaddingWithIconAtStart: `${pxToRem(5)} ${pxToRem(12)} ${pxToRem(5)} ${pxToRem(24)}`,
  inputPaddingWithIconAtEnd: `${pxToRem(5)} ${pxToRem(24)} ${pxToRem(5)} ${pxToRem(12)}`,

  inputPadding: `${pxToRem(5)} ${pxToRem(12)}`,

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
