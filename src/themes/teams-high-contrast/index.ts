import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import teams from '../teams'

export default mergeThemes(teams, { siteVariables })
