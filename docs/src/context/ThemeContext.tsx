import * as React from 'react'
import * as _ from 'lodash'
import { themes } from '@fluentui/react'

export type ThemeName = keyof typeof themes | 'fabricToTeams' | 'teamsToFabric'
type ThemeOption = { header: string; value: ThemeName }

const getThemeOptions = (): ThemeOption[] => {
  const themesKeys = [...Object.keys(themes), 'fabricToTeams', 'teamsToFabric']

  if (process.env.NODE_ENV === 'production') {
    // we don't show 'base' and 'fontAwesome' themes in production
    _.pull(themesKeys, 'base', 'fontAwesome', 'fabricToTeams', 'teamsToFabric')
  }

  return themesKeys.map(key => ({ header: _.startCase(key), value: key as ThemeName }))
}

export type ThemeContextData = {
  selectedTheme: ThemeOption
  themeOptions: ThemeOption[]
  changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void
}

export const themeContextDefaults: ThemeContextData = {
  selectedTheme: { header: 'Teams', value: 'teams' },
  themeOptions: getThemeOptions(),
  changeTheme: () => {},
}

export const ThemeContext = React.createContext<ThemeContextData>(themeContextDefaults)
