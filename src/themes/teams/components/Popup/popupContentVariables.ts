import { pxToRem } from '../../../../lib'

export interface IPopupContentVariables {
  [key: string]: string | number

  backgroundColor: string
  borderColor: string
  padding: string
  zIndex: number
}

export default (siteVars: any): IPopupContentVariables => {
  return {
    backgroundColor: siteVars.white,
    borderColor: siteVars.gray06,
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
    zIndex: 1000,
  }
}
