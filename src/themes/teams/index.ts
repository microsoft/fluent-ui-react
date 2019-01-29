import { ThemeIconSpec, ThemeIcons, FontIconSpec, SvgIconSpec } from '../types'

import mergeThemes from '../../lib/mergeThemes'
import base from '../base'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndMetaData } from './components/Icon/svg'
import { default as fontIcons } from './components/Icon/font'

import { TeamsSvgIconSpec, SvgIconSpecWithMetaData } from './components/Icon/svg/types'

const declareSvg = (svgIcon: SvgIconSpec, rotateInRtl: boolean): ThemeIconSpec => ({
  isSvg: true,
  icon: svgIcon,
  rotateInRtl,
})

const declareFontBased = (fontIcon: FontIconSpec): ThemeIconSpec => ({ icon: fontIcon })

const icons: ThemeIcons = Object.keys(svgIconsAndMetaData as {
  [iconName: string]: TeamsSvgIconSpec
}).reduce<ThemeIcons>((accIcons, iconName) => {
  const iconAndMaybeMetaData = svgIconsAndMetaData[iconName]

  const icon: SvgIconSpec = (iconAndMaybeMetaData as any).styles
    ? (iconAndMaybeMetaData as SvgIconSpecWithMetaData).icon
    : (iconAndMaybeMetaData as SvgIconSpec)

  const rotateInRtl = (iconAndMaybeMetaData as any).rotateInRtl
    ? (iconAndMaybeMetaData as any).rotateInRtl
    : false

  return { ...accIcons, ...{ [iconName]: declareSvg(icon, rotateInRtl) } }
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
