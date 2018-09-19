import { IThemeInput, ThemeIcons } from '../../../types/theme'

import Icon from '../../../src/components/Icon'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndStyles } from './components/Icon/svg'
import { default as fontIcons } from './components/Icon/font'

import { IconSpec } from './components/Icon/svg/types'

const icons: ThemeIcons = Object.keys(svgIconsAndStyles as { [iconName: string]: IconSpec }).reduce<
  ThemeIcons
>((accIcons, iconName) => {
  const iconAndStyle = svgIconsAndStyles[iconName]
  const icon = typeof iconAndStyle === 'object' ? iconAndStyle.icon : iconAndStyle // if icon function is only provided (and no styles)

  return { ...accIcons, ...{ [iconName]: Icon.declareSvg(icon) } }
}, {})

Object.keys(fontIcons).forEach(iconName => {
  icons[iconName] = Icon.declareFontBased(fontIcons[iconName])
})

export default {
  siteVariables,
  componentVariables,
  componentStyles,
  fontFaces,
  staticStyles,
  icons,
} as IThemeInput
