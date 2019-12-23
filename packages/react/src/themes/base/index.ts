import {
  // ThemeIconSpec,
  // ThemeIcons,
  // SvgIconSpec,
  ThemePrepared,
  // SiteVariablesPrepared,
} from '../types'

import { createTheme } from '../createTheme'
import mergeThemes from '../../utils/mergeThemes'

const baseTheme: ThemePrepared = createTheme(
  mergeThemes({
    siteVariables: {
      scale: 4,
      fontSizes: {
        small: '12px',
      },
    },

    componentVariables: {
      Button: sv => ({
        px: sv.scale * 3,
        py: sv.scale * 3,
      }),
    },

    componentStyles: {
      Button: {
        root: {
          border: 'none',
        },
      },
    },

    fontFaces: [
      {
        name: '',
        paths: [],
        props: {},
      },
    ],

    staticStyles: [],

    icons: {},

    animations: {},
  }),
  'base',
)

export default baseTheme
