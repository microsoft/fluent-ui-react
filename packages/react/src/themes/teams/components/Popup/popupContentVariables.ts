import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  [key: string]: string | number

  borderColor: string
  padding: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.gray06,
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
  }
}
