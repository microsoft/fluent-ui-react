import { pxToRem } from '../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.borderRadius = `${pxToRem(3)}`
  vars.borderBottom = `${pxToRem(2)} solid transparent`
  vars.height = '100%'
  vars.backgroundColor = siteVars.gray10

  vars.fontColor = siteVars.fontBlack
  vars.fontSize = siteVars.fontSizeBase

  vars.inputPadding = `${pxToRem(6)} ${pxToRem(24)} ${pxToRem(6)} ${pxToRem(12)}`
  vars.inputFocusBorderColor = siteVars.brand
  vars.inputFocusBorderRadius = `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`

  vars.iconPosition = 'absolute'
  vars.iconRight = `${pxToRem(2)}`

  return vars
}
