import { pxToRem as basePxToRem } from '../../../lib'
import { ThemeInput, ColorScheme, ColorSchemeMapping } from '../../types'
import { Partial } from '../../../../types/utils'

const themeFontSizeInPx = 14

export const pxToRem = (sizeInPx: number) => basePxToRem(sizeInPx, themeFontSizeInPx)

export const getSideArrow = (theme: ThemeInput) => {
  const { rtl, siteVariables } = theme
  const { arrowLeft, arrowRight } = siteVariables
  return rtl ? arrowLeft : arrowRight
}

export const getColorSchemeWithCustomDefaults = (
  customDefaultValues: Partial<ColorScheme>,
  colorScheme: ColorSchemeMapping,
) => {
  const mergedDefaultValues = {
    ...colorScheme.default,
    customDefaultValues,
  }
  return {
    ...colorScheme,
    default: mergedDefaultValues,
  }
}
