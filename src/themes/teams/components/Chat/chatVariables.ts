import { pxToRem } from '../../../../lib'

export interface IChatVariables {
  backgroundColor: string
  padding: string
}

export default (siteVars): IChatVariables => ({
  backgroundColor: siteVars.gray10,
  padding: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
})
