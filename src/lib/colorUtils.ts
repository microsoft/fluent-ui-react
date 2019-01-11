import * as _ from 'lodash'
import {
  SiteVariablesInput,
  ColorVariants,
  ColorValues,
  ColorSchemeMapping,
  ColorScheme,
} from '../themes/types'
import { Partial } from '../../types/utils'
import { ComplexColorPropType } from './commonPropInterfaces'

export const mapColorsToScheme = <T>(
  siteVars: SiteVariablesInput,
  mapper: keyof ColorVariants | ((color: ColorVariants) => T),
): ColorValues<T> =>
  _.mapValues(
    { ...siteVars.emphasisColors, ...siteVars.naturalColors },
    typeof mapper === 'number' ? String(mapper) : (mapper as any),
  ) as ColorValues<T>

export const getColorSchemeFn = <T>(colorProp: string, colorScheme: ColorValues<T>) => {
  const colors = _.get(colorScheme, colorProp)
  return (area: keyof T, defaultColor: string) => (colors ? colors[area] : defaultColor)
}

export const getColorSchemeFromObject = (
  colorScheme: ColorValues<Partial<ColorScheme>>,
  colors: ComplexColorPropType,
): Partial<ColorScheme> =>
  _.mapValues(colors, (color, colorName) => {
    // if the color scheme contains the color, then get the value from it, otherwise return the color provided
    const colorSchemeValue = _.get(colorScheme, color, colorScheme.default[color])
    return colorSchemeValue ? colorSchemeValue[colorName] : colors[colorName]
  })

export const getColorSchemeWithCustomDefaults = (
  colorScheme: ColorSchemeMapping,
  customDefaultValues: Partial<ColorScheme>,
) => {
  const mergedDefaultValues = {
    ...colorScheme.default,
    ...customDefaultValues,
  }
  return {
    ...colorScheme,
    default: mergedDefaultValues,
  }
}

export const generateColorScheme = (
  colorProp: ComplexColorPropType,
  colorScheme: ColorValues<Partial<ColorScheme>>,
): Partial<ColorScheme> => {
  // if both color prop and color scheme are defined, we are merging them
  if (colorProp && colorScheme) {
    return typeof colorProp === 'string'
      ? _.get(colorScheme, colorProp as string, colorScheme.default)
      : { ...colorScheme.default, ...getColorSchemeFromObject(colorScheme, colorProp) }
  }

  // if the color prop is not defined, but the the color scheme is defined, then we are returning
  // the defaults from the color scheme if they exists
  if (colorScheme) {
    return colorScheme && colorScheme.default ? colorScheme.default : {}
  }

  // if the color scheme is not defined, then if the color prop is a scheme object we are
  // returning it, otherwise we return an empty object, as it means that the component is
  // implementing the simple color prop
  if (colorProp) {
    return typeof colorProp === 'string' ? {} : colorProp
  }

  // if neither the color prop, nor the color scheme are defined, we are returning empty object
  return {}
}
