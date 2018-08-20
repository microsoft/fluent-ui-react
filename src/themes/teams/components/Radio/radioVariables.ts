import { pxToRem } from '../../../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.fontSize = siteVars.fontSizeMedium
  vars.fontWeight = '400'
  vars.labelMargin = `0 ${pxToRem(5)}`

  return vars
}
