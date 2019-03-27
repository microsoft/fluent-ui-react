import { ThemeInput, ThemeIconSpec, SvgIconSpec } from '../types'

import { default as svgIconsAndStyles } from './components/Icon/svg/ProcessedIcons'
import { TeamsProcessedSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'

type ThemeProcessedIconSpec = ThemeIconSpec &
  { [K in keyof TeamsProcessedSvgIconSpec]?: TeamsProcessedSvgIconSpec[K] }

const declareSvg = (svgIcon: SvgIconSpec, exportedAs?: string): ThemeProcessedIconSpec => ({
  isSvg: true,
  icon: svgIcon,
  exportedAs,
})

const getIcon = iconAndMaybeStyles => {
  return (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)
}

const processedIcons: { [key: string]: ThemeIconSpec } = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsProcessedSvgIconSpec
}).reduce<{ [key: string]: ThemeIconSpec }>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = getIcon(iconAndMaybeStyles)

  return {
    ...accIcons,
    ...{ [iconName]: declareSvg(icon, (iconAndMaybeStyles as any).exportedAs) },
  }
}, {})

const theme: ThemeInput = {
  icons: {
    ...processedIcons,
    close: getIcon(svgIconsAndStyles['close']) as ThemeIconSpec,
    'arrow-up': getIcon(svgIconsAndStyles['triangle-up'] || {}) as ThemeIconSpec,
    'arrow-down': getIcon(svgIconsAndStyles['triangle-down'] || {}) as ThemeIconSpec,
    'arrow-start': getIcon(svgIconsAndStyles['triangle-left'] || {}) as ThemeIconSpec,
    'arrow-end': getIcon(svgIconsAndStyles['triangle-right'] || {}) as ThemeIconSpec,
  },
}

export default theme
