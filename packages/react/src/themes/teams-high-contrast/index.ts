import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import teams from '../teams'
import { createTheme } from '../createTheme'

export default mergeThemes(
  teams,
  createTheme(
    {
      siteVariables,
      componentVariables,
      componentStyles,
    },
    'teams-high-contrast',
  ),
)
