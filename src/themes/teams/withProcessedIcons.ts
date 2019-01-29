import { ThemeInput, ThemeIcons, ThemeIconSpec, SvgIconSpec } from '../types'

import { default as svgIconsAndStyles } from './components/Icon/svg/ProcessedIcons'
import { TeamsProcessedSvgIconSpec, SvgIconSpecWithMetaData } from './components/Icon/svg/types'

type ThemeProcessedIconSpec = ThemeIconSpec &
  { [K in keyof TeamsProcessedSvgIconSpec]?: TeamsProcessedSvgIconSpec[K] }

const declareSvg = (
  svgIcon: SvgIconSpec,
  rotateInRtl,
  exportedAs?: string,
): ThemeProcessedIconSpec => ({
  isSvg: true,
  icon: svgIcon,
  rotateInRtl,
  exportedAs,
})

const processedIcons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsProcessedSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeMetaData = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = (iconAndMaybeMetaData as any).styles
    ? (iconAndMaybeMetaData as SvgIconSpecWithMetaData).icon
    : (iconAndMaybeMetaData as SvgIconSpec)

  const rotateInRtl = (iconAndMaybeMetaData as any).rotateInRtl
    ? (iconAndMaybeMetaData as any).rotateInRtl
    : false

  return {
    ...accIcons,
    ...{ [iconName]: declareSvg(icon, rotateInRtl, (iconAndMaybeMetaData as any).exportedAs) },
  }
}, {})

const theme: ThemeInput = { icons: processedIcons }

export default theme
