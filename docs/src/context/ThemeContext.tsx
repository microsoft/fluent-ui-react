import * as React from 'react'
import * as _ from 'lodash'
import { themes, ThemeName } from '@stardust-ui/react'

type ThemeOption = { text: string; value: ThemeName }

const themeOptions: ThemeOption[] = Object.keys(themes).map(key => ({
  text: _.startCase(key),
  value: key as ThemeName,
}))

export type ThemeContextData = {
  themeName: ThemeName
  themeOptions: ThemeOption[]
  changeTheme: (event: React.SyntheticEvent, data: { value: ThemeOption }) => void
}

export const themeContextDefaults: ThemeContextData = {
  themeName: 'teams',
  themeOptions,
  changeTheme: () => {},
}

export const ThemeContext = React.createContext<ThemeContextData>(themeContextDefaults)
