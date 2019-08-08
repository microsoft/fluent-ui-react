import * as _ from 'lodash'
import { themes } from '@stardust-ui/react'

export type ThemeName = keyof typeof themes

export const themeNames = Object.keys(themes) as ThemeName[]
if (process.env.NODE_ENV === 'production') {
  // we don't show 'base' and 'fontAwesome' themes in production
  _.pull(themeNames, 'base', 'fontAwesome')
}

// This is a broken theme...
_.pull(themeNames, 'fontAwesome')
