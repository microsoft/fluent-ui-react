import { pxToRem } from '../../../teams/utils'

export interface InputVariables {
  backgroundColor: string
  border: string
  borderRadius: string
  fontColor: string
  fontSize: string
  iconColor: string
  iconPosition: string
  iconRight: string
  iconLeft: string
  inputPaddingWithIconAtStart: string
  inputPaddingWithIconAtEnd: string
  inputPadding: string
  inputFocusBorderRadius: string
}

export default (siteVars): InputVariables => ({
  backgroundColor: siteVars.colors.grey[50],
  border: `${pxToRem(1)} solid transparent`,
  borderRadius: pxToRem(3),

  fontColor: siteVars.bodyColor,
  fontSize: siteVars.fontSizes.medium,

  iconPosition: 'absolute',
  iconRight: pxToRem(2),
  iconColor: siteVars.bodyColor,
  iconLeft: pxToRem(6),
  inputPaddingWithIconAtStart: `${pxToRem(6)} ${pxToRem(12)} ${pxToRem(6)} ${pxToRem(24)}`,
  inputPaddingWithIconAtEnd: `${pxToRem(6)} ${pxToRem(24)} ${pxToRem(6)} ${pxToRem(12)}`,

  inputPadding: `${pxToRem(6)} ${pxToRem(12)} ${pxToRem(6)} ${pxToRem(12)}`,
  inputFocusBorderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
})
