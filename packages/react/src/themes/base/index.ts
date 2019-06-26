import { ThemeInput } from '../types'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import { icons } from './components/Icon/iconNames'

export default {
  siteVariables,
  // staticStyles: [{
  //   '*:hover > .red-on-parent-hover': {
  //     color: 'red',
  //   },
  // }],
  icons,
  componentVariables,
  componentStyles,
} as ThemeInput
