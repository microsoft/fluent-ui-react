import { pxToRem } from '../../lib'

export default () => {
  const vars: any = {}
  vars.circularRadius = pxToRem(9999)
  vars.padding = `0 ${pxToRem(4)} 0 ${pxToRem(4)}`
  vars.color = 'rgba(0, 0, 0, 0.6)'
  return vars
}
