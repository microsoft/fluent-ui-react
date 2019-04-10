import { ThemeInput } from '../types'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import { FontIconSpec, ThemeIconSpec, ThemeIcons } from 'src/themes/types'
import { default as fontIcons, icons } from './components/Icon/index'

const declareFontBased = (fontIcon: FontIconSpec): ThemeIconSpec => ({ icon: fontIcon })

const themeIcons: ThemeIcons = {}
Object.keys(icons).forEach(iconName => {
  themeIcons[iconName] = declareFontBased(fontIcons[iconName])
})

export default {
  siteVariables,
  icons: themeIcons,
  componentVariables,
  componentStyles,
} as ThemeInput
