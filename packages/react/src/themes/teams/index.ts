import { ThemeIconSpec, ThemeIcons, FontIconSpec, SvgIconSpec } from '../types'

import mergeThemes from '../../lib/mergeThemes'
import base from '../base'
import animations from './animations'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndStyles } from './components/Icon/svg'
import { default as fontIcons } from './components/Icon/font'

import { TeamsSvgIconSpec, SvgIconSpecWithStyles } from './components/Icon/svg/types'

const declareSvg = (svgIcon: SvgIconSpec): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
})

const declareFontBased = (fontIcon: FontIconSpec): ThemeIconSpec => ({ icon: fontIcon })

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

Object.keys(fontIcons).forEach(iconName => {
  themeIcons[iconName] = declareFontBased(fontIcons[iconName])
})

const icons: ThemeIcons = {
  ...themeIcons,
  'stardust-close': themeIcons['close'],
  'stardust-arrow-up': themeIcons['triangle-up'],
  'stardust-arrow-down': themeIcons['triangle-down'],
  'stardust-arrow-end': themeIcons['triangle-right'],
  'stardust-pause': themeIcons['pause'],
  'stardust-play': themeIcons['play'],
}

export default mergeThemes(base, {
  siteVariables,
  componentVariables,
  componentStyles,
  fontFaces,
  staticStyles,
  icons,
  animations,
})
