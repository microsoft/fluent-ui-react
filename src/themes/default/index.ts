import * as siteVariables from './siteVariables'

import mergeThemes from '../../lib/mergeThemes'
import base from '../base'

export default mergeThemes(base, {
  siteVariables,
})
