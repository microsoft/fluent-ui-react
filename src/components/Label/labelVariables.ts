import { pxToRem } from '../../lib'

export default () => {
  const vars: any = {}
  vars.circularRadius = pxToRem(5000)
  vars.padding = `${pxToRem(6)} ${pxToRem(8)}`
  vars.color = 'rgba(0, 0, 0, 0.6)'
  return vars
}
