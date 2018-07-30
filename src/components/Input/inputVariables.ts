import { pxToRem } from '../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.borderRadius = `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`

  vars.defaultBorder = `${pxToRem(2)} solid transparent`
  vars.defaultBorderFocus = `${pxToRem(1)} solid #85b7d9`
  vars.defaultBorderError = `${pxToRem(1)} solid #e0b4b4`
  vars.defaultPadding = `${pxToRem(3)}`

  vars.backgroundColor = siteVars.gray10
  vars.fontColor = '#252424'
  vars.fontSize = '14px'
  vars.inputPadding = `${pxToRem(3)} ${pxToRem(6)} ${pxToRem(3)} ${pxToRem(6)}`
  vars.focusBorderBottom = `${pxToRem(2)} solid #6264a7`
  vars.borderBottom = `${pxToRem(2)} solid transparent`
  vars.height = '100%'

  return vars
}
