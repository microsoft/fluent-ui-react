import { ThemeIconSpec, ThemeIcons, SvgIconSpec, ThemePrepared } from '../types'

import animations from './animations'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndStyles } from './components/Icon/svg'

import { TeamsSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'
import { createTheme } from '../createTheme'

const declareSvg = (svgIcon: SvgIconSpec): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
})

export const getIcon = (iconAndMaybeStyles): SvgIconSpec => {
  return (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)
}

const themeIcons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = getIcon(iconAndMaybeStyles)

  return { ...accIcons, ...{ [iconName]: declareSvg(icon) } }
}, {})

const icons: ThemeIcons = {
  ...themeIcons,
  'stardust-checkmark': themeIcons['accept'],
  'stardust-circle': themeIcons['stardust-circle'],
  'stardust-close': themeIcons['close'],
  'stardust-arrow-up': themeIcons['triangle-up'],
  'stardust-arrow-down': themeIcons['triangle-down'],
  'stardust-arrow-end': themeIcons['triangle-right'],
  'stardust-menu-arrow-down': themeIcons['chevron-down-medium'],
  'stardust-menu-arrow-end': themeIcons['chevron-right-medium'],
  'stardust-pause': themeIcons['pause'],
  'stardust-play': themeIcons['play'],
}

const teamsTheme: ThemePrepared = createTheme(
  {
    siteVariables,
    componentVariables,
    componentStyles,
    fontFaces,
    staticStyles,
    icons,
    animations,
  },
  'teams',
)

export default teamsTheme
