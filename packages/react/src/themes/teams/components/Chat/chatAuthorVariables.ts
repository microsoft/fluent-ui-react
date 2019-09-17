import { pxToRem } from '../../../../lib'

export interface ChatAuthorVariables {
  color: string
  fontSize: string
  fontWeight: number
  lineHeight: string
  margin: string
}

export default (siteVars): ChatAuthorVariables => ({
  color: siteVars.colors.grey[500],
  fontSize: siteVars.fontSizes.small,
  fontWeight: siteVars.fontWeightRegular,
  lineHeight: siteVars.lineHeightSmall,
  margin: `0 ${pxToRem(12)} ${pxToRem(2)} 0`,
})
