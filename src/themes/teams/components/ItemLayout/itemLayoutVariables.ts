import { teamsPxToRem } from '../../utils'

export default () => {
  const vars: any = {}

  vars.paddingLeft = teamsPxToRem(20)
  vars.paddingRight = teamsPxToRem(18)
  vars.columnGap = teamsPxToRem(8)

  vars.height = teamsPxToRem(48)

  return vars
}
