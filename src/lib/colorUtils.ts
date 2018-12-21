import * as _ from 'lodash'
import { SiteVariablesInput, ColorVariants, ColorValues } from '../themes/types'

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
