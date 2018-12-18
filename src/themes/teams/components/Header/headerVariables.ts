import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface HeaderVariables {
  colors: ColorValues<string>
  color: string
  descriptionColor: string
}

export default (siteVars: any): HeaderVariables => {
  const colorVariant = 500
  return {
    colors: mapColorsToScheme(siteVars, colorVariant),
    color: siteVars.black,
    descriptionColor: undefined,
  }
}
