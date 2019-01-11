import { ThemeInput } from '../../types'

export const getSideArrow = (theme: ThemeInput) => {
  const { rtl, siteVariables } = theme
  const { arrowLeft, arrowRight } = siteVariables
  return rtl ? arrowLeft : arrowRight
}
