import mergeThemes from '../../utils/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import teams from '../teams'
import { createTheme } from '../createTheme'

export default mergeThemes(
  teams,
  createTheme(
    {
      siteVariables,
      componentVariables,
    },
    'teams-dark',
  ),
)
