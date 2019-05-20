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

export const invertColorScheme = (colorScheme: ColorSchemeMapping): ColorSchemeMapping => {
  return Object.keys(colorScheme).reduce((accumulator, colorName: string) => {
    const foreground = colorScheme[colorName].foreground
    const background = colorScheme[colorName].background
    return {
      ...accumulator,
      [colorName]: {
        ...colorScheme[colorName],
        foreground: background,
        background: foreground,
      },
    }
  }, {})
}

export default (siteVars: SiteVariablesPrepared): LabelVariables => {
  const invertedColorScheme = invertColorScheme(siteVars.colorScheme)

  return {
    colorScheme: extendColorScheme(invertedColorScheme, {
      // TODO use here some color scheme values, after the designs are delivered
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
