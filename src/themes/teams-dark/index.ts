import { IThemeInput } from '../../../types/theme'

import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import { default as teams } from '../teams'
import mergeThemes from '../../lib/mergeThemes'

const teamsDark = {
  siteVariables,
  componentVariables,
  componentStyles,
} as IThemeInput

export default teamsDark
export const teamsLightPlusTeamsDark = mergeThemes(teams, teamsDark)
