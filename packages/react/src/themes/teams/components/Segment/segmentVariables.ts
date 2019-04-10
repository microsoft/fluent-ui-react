import { ColorSchemeMapping } from '../../../../themes/types'

export interface SegmentVariables {
  colorScheme: ColorSchemeMapping
  color: string
  backgroundColor: string
  padding: string
  borderRadius: string | number
  boxShadowColor: string
}

export default (siteVariables): SegmentVariables => {
  return {
    colorScheme: siteVariables.colorScheme,
    color: siteVariables.bodyColor,
    backgroundColor: siteVariables.bodyBackground,
    padding: '1em',
    borderRadius: 0,
    boxShadowColor: 'rgba(34,36,38,.15)',
  }
}
