import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'

import mergeThemes from '../../lib/mergeThemes'
import base from '../base'

export default mergeThemes(base, {
  siteVariables,
  componentVariables,
  componentStyles,
})
