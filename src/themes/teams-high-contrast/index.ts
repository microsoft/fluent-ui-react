import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import teams from '../teams'

const darkThemeOverrides = {
  componentVariables: {
    Avatar: {
      statusBorderColor: siteVariables.black,
    },
  },
}

export default mergeThemes(teams, { siteVariables, componentVariables }, darkThemeOverrides)
