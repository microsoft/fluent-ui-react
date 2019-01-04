import { ThemeInput } from '../types'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'

export default {
  animations: {
    spinner: {
      keyframe: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      duration: '1s',
      iterationCount: 'infinite',
    },
  },
  siteVariables,
  componentVariables,
  componentStyles,
} as ThemeInput
