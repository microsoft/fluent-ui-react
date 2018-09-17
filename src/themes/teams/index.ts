import { IThemeInput, ThemeIcons } from '../../../types/theme'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import fontFaces from './fontFaces'
import staticStyles from './staticStyles'

import { default as iconsAndStyles } from './components/Icon/svg'
import { IconSpec } from './components/Icon/svg/types'

const icons = Object.keys(iconsAndStyles as { [iconName: string]: IconSpec }).reduce<ThemeIcons>(
  (accIcons, iconName) => {
    const iconAndStyle = iconsAndStyles[iconName]
    const icon = typeof iconAndStyle === 'object' ? iconAndStyle.icon : iconAndStyle // if icon function is only provided (and no styles)

    return { ...accIcons, ...{ [iconName]: icon } }
  },
  {},
)

export default {
  siteVariables,
  componentVariables,
  componentStyles,
  fontFaces,
  staticStyles,
  icons,
} as IThemeInput
