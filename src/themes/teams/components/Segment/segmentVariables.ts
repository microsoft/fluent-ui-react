import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface SegmentVariables {
  colors: ColorValues<string>
  color: string
  background: string
  padding: string
  borderRadius: string | number
}

export default (siteVariables): SegmentVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),
    color: undefined,
    background: siteVariables.bodyBackground,
    padding: '1em',
    borderRadius: 0,
  }
}
