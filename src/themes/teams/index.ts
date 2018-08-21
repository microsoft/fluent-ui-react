import { IThemeInput } from '../../../types/theme'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'

export const theme: IThemeInput = {
  rtl: false,
  siteVariables,
  componentVariables,
  componentStyles,
}

export { default as fontFaces } from './fontFaces'
export { default as staticStyles } from './staticStyles'
