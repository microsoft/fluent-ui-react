import { pxToRem } from '../../../../lib'

export interface PopupContentVariables {
  [key: string]: string | number

  borderColor: string
  padding: string
}

export default (siteVars: any): PopupContentVariables => {
  return {
    borderColor: siteVars.colors.grey[250],
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
  }
}
