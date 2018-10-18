import { teamsPxToRem } from '../../utils'

export default (siteVars: any) => {
  const vars: any = {}

  vars.borderRadius = `${teamsPxToRem(3)}`
  vars.borderBottom = `${teamsPxToRem(2)} solid transparent`
  vars.backgroundColor = siteVars.gray10

  vars.fontColor = siteVars.bodyColor
  vars.fontSize = siteVars.fontSizes.medium

  vars.inputPadding = `${teamsPxToRem(6)} ${teamsPxToRem(24)} ${teamsPxToRem(6)} ${teamsPxToRem(
    12,
  )}`
  vars.inputFocusBorderColor = siteVars.brand
  vars.inputFocusBorderRadius = `${teamsPxToRem(3)} ${teamsPxToRem(3)} ${teamsPxToRem(
    2,
  )} ${teamsPxToRem(2)}`

  vars.iconPosition = 'absolute'
  vars.iconRight = `${teamsPxToRem(2)}`

  return vars
}
