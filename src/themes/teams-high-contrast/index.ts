import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import { IThemeInput } from '../../../types/theme'
import mergeThemes from '../../lib/mergeThemes'
import { default as teams } from '../teams'

const teamsHighContrast = {
  siteVariables,
  componentVariables,
  componentStyles,
} as IThemeInput

export default teamsHighContrast
export const teamsLightPlusTeamsHighContrast = mergeThemes(teams, teamsHighContrast)
