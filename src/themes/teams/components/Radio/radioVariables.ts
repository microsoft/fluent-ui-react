import { pxToRem } from '../../../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.fontWeight = 400
  vars.radioMargin = `${pxToRem(5)}`

  return vars
}
