import { pxToRem } from '../../../../lib'

export interface InputVariables {
  backgroundColor: string
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
  backgroundColor: siteVars.colors.grey[50],
  borderColor: siteVars.colors.grey[300],
  borderRadius: pxToRem(3),
  borderWidth: `1px`,

  fontColor: siteVars.colors.grey[600],
  fontSize: pxToRem(14),

  iconPosition: 'absolute',
  iconRight: pxToRem(10),
  iconColor: siteVars.colors.grey[800],
  iconLeft: pxToRem(6),
  inputPaddingWithIconAtStart: `${pxToRem(7)} ${pxToRem(12)} ${pxToRem(7)} ${pxToRem(24)}`,
  inputPaddingWithIconAtEnd: `${pxToRem(7)} ${pxToRem(24)} ${pxToRem(7)} ${pxToRem(12)}`,

  inputPadding: `${pxToRem(7)} ${pxToRem(12)}`,
  inputFocusBorderColor: siteVars.colors.primary[300],
  inputFocusBorderRadius: pxToRem(3),

  placeholderColor: siteVars.colors.grey[600],
})
