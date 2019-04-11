import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  borderColor: string
  borderSize: number
  padding: string

  contentColor: string
  contentBackgroundColor: string
  contentPointerPadding: string

  pointerHeight: string
  pointerWidth: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.gray06,
    borderSize: 1,
    padding: `${pxToRem(10)} ${pxToRem(14)}`,

    contentColor: siteVars.bodyColor,
    contentBackgroundColor: siteVars.bodyBackground,
    contentPointerPadding: pxToRem(10),

    pointerHeight: pxToRem(10),
    pointerWidth: pxToRem(10),
  }
}
