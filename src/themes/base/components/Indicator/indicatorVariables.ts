import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface IndicatorVariables {
  colors: ColorValues<string>
}

export default (siteVariables): IndicatorVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),
  }
}
