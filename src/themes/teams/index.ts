import { IThemeInput, SvgIcons } from '../../../types/theme'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as svgIconsAndStyles } from './components/Icon/svg'
import { IconSpec } from './components/Icon/svg/types'

const svgIcons = Object.keys(svgIconsAndStyles as { [iconName: string]: IconSpec }).reduce<
  SvgIcons
>((accSvgIcons, iconName) => {
  const iconAndStyle = svgIconsAndStyles[iconName]

  const icon = typeof iconAndStyle === 'object' ? iconAndStyle.icon : iconAndStyle // if icon function is only provided (and no styles)

  return { ...accSvgIcons, ...{ [iconName]: icon } }
}, {})

export default {
  siteVariables,
  componentVariables,
  componentStyles,
  fontFaces,
  staticStyles,
  svgIcons,
} as IThemeInput
