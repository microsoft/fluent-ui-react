import { pxToRem } from '../../../../lib'

export default (siteVars: any) => {
  const vars: any = {}

  vars.fontWeight = 400
  vars.radioMargin = `${pxToRem(10)}`

  vars.uncheckedIconColor = siteVars.brand
  vars.uncheckedIconBorderColor = siteVars.brand
  vars.uncheckedIconBackgroundColor = 'white'

  vars.checkedIconColor = 'white'
  vars.checkedIconBorderColor = siteVars.brand
  vars.checkedIconBackgroundColor = siteVars.brand

  return vars
}
