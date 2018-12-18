import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface HeaderDescriptionVariables {
  colors: ColorValues<string>
  color: string
}

export default (siteVariables: any): HeaderDescriptionVariables => {
  const colorVariant = 500
  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),
    color: siteVariables.gray04,
  }
}
