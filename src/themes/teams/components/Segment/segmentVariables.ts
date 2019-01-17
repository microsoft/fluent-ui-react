import { ColorValues } from '../../../types'
import { mapColorsToScheme } from '../../../../lib'

export interface SegmentVariables {
  colors: ColorValues<string>
  color: string
  backgroundColor: string
  padding: string
  borderRadius: string | number
  boxShadowColor: string
}

export default (siteVariables): SegmentVariables => {
  const colorVariant = 500

  return {
    colors: mapColorsToScheme(siteVariables, colorVariant),
    color: siteVariables.black,
    backgroundColor: siteVariables.bodyBackground,
    padding: '1em',
    borderRadius: 0,
    boxShadowColor: 'rgba(34,36,38,.15)',
  }
}
