import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  [key: string]: string | number

  backgroundColor: string
  borderColor: string
  padding: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    backgroundColor: siteVars.white,
    borderColor: siteVars.gray06,
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
  }
}
