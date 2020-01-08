import mergeThemes from '../../utils/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import teams from '../teams'
import { createTheme } from '../createTheme'

export default mergeThemes(
  teams,
  createTheme(
    {
      hash: 'teams-high-contrast',
      siteVariables,
      componentVariables,
      componentStyles,
    },
    'teams-high-contrast',
  ),
)
