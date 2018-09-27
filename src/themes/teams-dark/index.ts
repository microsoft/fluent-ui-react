import { IThemeInput } from '../../../types/theme'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import { default as teams } from '../teams'
import mergeThemes from '../../lib/mergeThemes'

export const teamsDarkOnly = {
  siteVariables,
  componentVariables,
  componentStyles,
} as IThemeInput

export default mergeThemes(teams, teamsDarkOnly)
