import { ThemeInput, ThemeIconSpec, ThemeIcons, SvgIconSpec } from '../types'

import { default as svgIconsAndStyles } from './components/Icon/svg/ProcessedIcons'
import { TeamsSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'

const declareSvg = (svgIcon: SvgIconSpec): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
})

const processedIcons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)

  return { ...accIcons, ...{ [iconName]: declareSvg(icon) } }
}, {})

const theme: ThemeInput = { icons: processedIcons }

export default theme
