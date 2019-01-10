import { pxToRem as basePxToRem } from '../../../lib'
import { ThemeInput } from '../../types'

const themeFontSizeInPx = 14

export const pxToRem = (sizeInPx: number) => basePxToRem(sizeInPx, themeFontSizeInPx)

export const getSideArrow = (theme: ThemeInput) => {
  const { rtl, siteVariables } = theme
  const { arrowLeft, arrowRight } = siteVariables
  return rtl ? arrowLeft : arrowRight
}
