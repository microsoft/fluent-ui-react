import * as svgIconsAndStyles from './icons'
import { IconSpec } from './types'

export const getStyle = partName => {
  return args => {
    const { props } = args

    if (!props.svg) {
      return undefined
    }

    const iconStyles =
      typeof svgIconsAndStyles[props.name] === 'object'
        ? svgIconsAndStyles[props.name].styles
        : undefined

    if (iconStyles && iconStyles[partName]) {
      return iconStyles[partName](args)
    }

    return undefined
  }
}

export default svgIconsAndStyles as { [iconName: string]: IconSpec }
