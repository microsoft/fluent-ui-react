import { pxToRem } from '../../lib'

export interface IMenuButtonVariables {
  height: string
  minWidth: string
  maxWidth: string
  backgroundColor: string
  backgroundColorHover: string
}

export default (siteVars: any): IMenuButtonVariables => {
  return {
    height: pxToRem(32),
    minWidth: pxToRem(96),
    maxWidth: pxToRem(280),
    backgroundColor: siteVars.gray08,
    backgroundColorHover: siteVars.gray06,
  }
}
