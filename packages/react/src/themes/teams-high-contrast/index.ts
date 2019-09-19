import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import teams from '../teams'
import withDebugId from '../../lib/withDebugId'

export default mergeThemes(
  teams,
  withDebugId(
    {
      siteVariables,
      componentVariables,
      componentStyles,
    },
    'teams-high-contrast',
  ),
)
