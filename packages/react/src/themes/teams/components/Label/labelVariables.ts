import { pxToRem } from '../../../../lib'
import { SiteVariablesPrepared, ColorSchemeMapping } from '../../../types'
import { extendColorScheme } from '../../../colorUtils'

export interface LabelVariables {
  colorScheme: ColorSchemeMapping
  circularRadius: string
  padding: string
  startPaddingLeft: string
  endPaddingRight: string
  height: string
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const originalColorScheme = siteVars.colorScheme
  const invertedColorScheme = Object.keys(originalColorScheme).reduce((accumulator, key) => {
    const foreground = originalColorScheme[key].foreground
    const background = originalColorScheme[key].background
    return {
      ...accumulator,
      [key]: {
        ...originalColorScheme[key],
        foreground: background,
        background: foreground,
      },
    }
  }, {})

  return {
    colorScheme: extendColorScheme(invertedColorScheme, {
      default: {
        foreground: 'rgba(0, 0, 0, 0.6)',
        background: 'rgb(232, 232, 232)',
      },
      brand: {
        foreground: siteVars.colorScheme.brand.foreground4,
      },
      red: {
        foreground: siteVars.colorScheme.red.foreground1,
      },
    }),
    circularRadius: pxToRem(9999),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),
  }
}
