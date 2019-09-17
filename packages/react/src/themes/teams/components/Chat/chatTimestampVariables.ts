import { pxToRem } from '../../../../lib'

export interface ChatTimestampVariables {
  color: string
  colorHover: string
  fontSize: string
  lineHeight: string
  margin: string

  mineColor: string
}

export default (siteVars): ChatTimestampVariables => ({
  color: siteVars.colors.grey[350],
  colorHover: siteVars.colors.grey[500],
  fontSize: siteVars.fontSizes.small,
  lineHeight: siteVars.lineHeightSmall,
  margin: `0 0 ${pxToRem(2)} 0`,
  mineColor: siteVars.colors.grey[500],
})
