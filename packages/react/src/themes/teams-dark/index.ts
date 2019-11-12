import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import teams from '../teams'
import { createTheme } from '../createTheme'

export default mergeThemes(
  teams,
  createTheme(
    {
      name: 'teams-dark',
      siteVariables,
      componentVariables,
    },
    'teams-dark',
  ),
)
