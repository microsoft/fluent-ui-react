import { pxToRem } from '../../../../lib'

export interface InputVariables {
  backgroundColor: string
  border: string
  borderRadius: string
  boxShadow: string
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
  border: `${pxToRem(1)} solid transparent`,
  borderRadius: pxToRem(3),
  boxShadow: `0 ${pxToRem(1)} 0 ${siteVars.brand}`,

  fontColor: siteVars.bodyColor,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: pxToRem(2),
  iconColor: siteVars.bodyColor,
  iconLeft: pxToRem(6),
  inputPaddingWithIconAtStart: `${pxToRem(6)} ${pxToRem(12)} ${pxToRem(6)} ${pxToRem(24)}`,
  inputPaddingWithIconAtEnd: `${pxToRem(6)} ${pxToRem(24)} ${pxToRem(6)} ${pxToRem(12)}`,

  inputPadding: `${pxToRem(6)} ${pxToRem(12)} ${pxToRem(6)} ${pxToRem(12)}`,
  inputFocusBorderBottomColor: siteVars.brand,
  inputFocusBorderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
})
