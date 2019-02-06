import { ThemeIconSpec, ThemeIcons, FontIconSpec, SvgIconSpec } from '../types'

import mergeThemes from '../../lib/mergeThemes'
import base from '../base'

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

const icons: ThemeIcons = Object.keys(svgIconsAndStyles as {
  [iconName: string]: TeamsSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeStyles = svgIconsAndStyles[iconName]

  const icon: SvgIconSpec = (iconAndMaybeStyles as any).styles
    ? (iconAndMaybeStyles as SvgIconSpecWithStyles).icon
    : (iconAndMaybeStyles as SvgIconSpec)

  return { ...accIcons, ...{ [iconName]: declareSvg(icon) } }
}, {})

Object.keys(fontIcons).forEach(iconName => {
  icons[iconName] = declareFontBased(fontIcons[iconName])
})

export default mergeThemes(base, {
  siteVariables,
  componentVariables,
  componentStyles,
  fontFaces,
  staticStyles,
  icons,
})
