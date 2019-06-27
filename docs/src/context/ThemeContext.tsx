import * as React from 'react'
import * as _ from 'lodash'
import { themes } from '@stardust-ui/react'

type ThemeName = keyof typeof themes
type ThemeOption = { text: string; value: ThemeName }

const getThemeOptions = (): ThemeOption[] => {
  const themesKeys = Object.keys(themes)

  if (process.env.NODE_ENV === 'production') {
    // we don't show 'base' and 'fontAwesome' themes in production
    _.pull(themesKeys, 'base', 'fontAwesome')
  }

  return themesKeys.map(key => ({ text: _.startCase(key), value: key as ThemeName }))
}

export type ThemeContextData = {
  themeName: ThemeName
  themeOptions: ThemeOption[]
  changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void
}

export const themeContextDefaults: ThemeContextData = {
  themeName: 'teams',
  themeOptions: getThemeOptions(),
  changeTheme: () => {},
}

export const ThemeContext = React.createContext<ThemeContextData>(themeContextDefaults)
