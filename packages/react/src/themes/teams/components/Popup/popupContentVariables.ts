import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  borderColor: string
  borderRadius: string
  borderSize: string
  padding: string

  pointerMargin: string
  pointerOffset: string
  pointerSize: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.gray06,
    borderRadius: pxToRem(3),
    borderSize: '1px',
    padding: `${pxToRem(10)} ${pxToRem(14)}`,

    pointerOffset: pxToRem(5),
    pointerMargin: pxToRem(10),
    pointerSize: pxToRem(10),
  }
}
