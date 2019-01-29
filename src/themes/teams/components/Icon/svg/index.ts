import svgIconsAndMetaData from './icons'
import { SvgIconSpecWithMetaData, TeamsSvgIconSpec } from './types'

export const getStyle = partName => {
  return args => {
    const { props } = args

    const maybeIconSpec = svgIconsAndMetaData[props.name]
    const maybeIconStyles = maybeIconSpec && (maybeIconSpec as SvgIconSpecWithMetaData).styles

    if (maybeIconStyles && maybeIconStyles[partName]) {
      return maybeIconStyles[partName](args)
    }

    return undefined
  }
}

export default svgIconsAndMetaData as { [iconName: string]: TeamsSvgIconSpec }
