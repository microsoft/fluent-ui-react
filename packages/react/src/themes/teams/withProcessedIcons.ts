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

const processedIcons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsProcessedSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
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
    'stardust-close': processedIcons['close'],
    'stardust-arrow-up': processedIcons['triangle-up'],
    'stardust-arrow-down': processedIcons['triangle-down'],
    'stardust-arrow-end': processedIcons['triangle-right'],
    'stardust-chevron-left': processedIcons['chevron-left'],
    'stardust-chevron-right': processedIcons['chevron-right'],
  },
}

export default theme
