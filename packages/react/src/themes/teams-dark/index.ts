import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import teams from '../teams'
import withDebugId from '../../lib/withDebugId'

export default mergeThemes(teams, {
  siteVariables,
  componentVariables: withDebugId(componentVariables, 'teams-dark'),
})
