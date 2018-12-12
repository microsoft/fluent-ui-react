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
