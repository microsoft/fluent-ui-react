import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  borderColor: string
  borderRadius: string
  borderSize: string
  padding: string

  pointerPadding: string
  pointerOffset: string
  pointerHeight: string
  pointerWidth: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.gray06,
    borderRadius: pxToRem(3),
    borderSize: '1px',
    padding: `${pxToRem(10)} ${pxToRem(14)}`,

    pointerOffset: pxToRem(5),
    pointerPadding: pxToRem(10),
    pointerHeight: pxToRem(10),
    pointerWidth: pxToRem(10),
  }
}
