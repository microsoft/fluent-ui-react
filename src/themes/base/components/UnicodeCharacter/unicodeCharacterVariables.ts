import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface UnicodeCharacterVariables {
  colors: ColorValues<string>
}

export default (siteVariables): UnicodeCharacterVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),
  }
}
