import { ThemeInput, ThemeIconSpec, SvgIconSpec, ThemeIcons } from '../types'

import { default as svgIconsAndStyles } from './components/Icon/svg/ProcessedIcons'
import { TeamsProcessedSvgIconSpec } from './components/Icon/svg/types'
import { getIcon } from './index'

type ThemeProcessedIconSpec = ThemeIconSpec &
  { [K in keyof TeamsProcessedSvgIconSpec]?: TeamsProcessedSvgIconSpec[K] }

const declareSvg = (svgIcon: SvgIconSpec, exportedAs?: string): ThemeProcessedIconSpec => ({
  isSvg: true,
  icon: svgIcon,
  exportedAs,
})

const processedIcons: ThemeIcons = Object.keys(
  svgIconsAndStyles as {
    [iconName: string]: TeamsProcessedSvgIconSpec
  },
).reduce<ThemeIcons>((accIcons, iconName) => {
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
    'icon-close': processedIcons['close'],
    'icon-arrow-up': processedIcons['triangle-up'],
    'icon-arrow-down': processedIcons['triangle-down'],
    'icon-arrow-end': processedIcons['triangle-right'],
    'stardust-chevron-start': processedIcons['chevron-start'],
    'stardust-chevron-end': processedIcons['chevron-end'],
  },
}

export default theme
