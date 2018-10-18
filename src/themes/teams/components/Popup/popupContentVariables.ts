import { teamsPxToRem } from '../../utils'

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
    padding: `${teamsPxToRem(10)} ${teamsPxToRem(14)}`,
    zIndex: 1000,
  }
}
