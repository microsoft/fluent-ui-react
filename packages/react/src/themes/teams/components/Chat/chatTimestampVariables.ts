import { pxToRem } from '../../../../lib'

export interface ChatTimestampVariables {
  margin: string

  mineColor: string
}

export default (siteVars): ChatTimestampVariables => ({
  margin: pxToRem(10),
  mineColor: siteVars.colors.grey[500],
})
