// import { pxToRem } from '../../../../lib'

export interface TreeTitleVariables {
  defaultColor: string
}

export default (siteVars: any): TreeTitleVariables => {
  return {
    defaultColor: siteVars.black,
  }
}
