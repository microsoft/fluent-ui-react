import { pxToRem } from '../../../../lib'

export default () => {
  const vars: any = {}
  vars.circularRadius = pxToRem(9999)
  vars.padding = `0 ${pxToRem(4)} 0 ${pxToRem(4)}`
  vars.color = 'rgba(0, 0, 0, 0.6)'
  vars.backgroundColor = 'rgb(232, 232, 232)'
  vars.startPaddingLeft = '0px'
  vars.endPaddingRight = '0px'
  vars.height = pxToRem(20)
  return vars
}
