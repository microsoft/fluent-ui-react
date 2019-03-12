import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  [key: string]: string | number

  backgroundColor: string
  borderColor: string
  padding: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    backgroundColor: siteVars.colors.white,
    borderColor: siteVars.colors.grey.light06,
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
  }
}
