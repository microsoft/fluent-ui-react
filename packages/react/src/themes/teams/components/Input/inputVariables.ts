import { pxToRem } from '../../../../lib'

export interface InputVariables {
  backgroundColor: string
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
  inputFocusBorderBottomColor: string
  inputFocusBorderRadius: string
}

export default (siteVars): InputVariables => ({
  backgroundColor: siteVars.gray10,
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,

  fontColor: siteVars.gray02,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: pxToRem(2),
  iconColor: siteVars.bodyColor,
  iconLeft: pxToRem(6),
  inputPaddingWithIconAtStart: `${pxToRem(7)} ${pxToRem(12)} ${pxToRem(7)} ${pxToRem(24)}`,
  inputPaddingWithIconAtEnd: `${pxToRem(7)} ${pxToRem(24)} ${pxToRem(7)} ${pxToRem(12)}`,

  inputPadding: `${pxToRem(7)} ${pxToRem(12)}`,
  inputFocusBorderBottomColor: siteVars.brand,
  inputFocusBorderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
})
