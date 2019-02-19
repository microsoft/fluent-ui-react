import * as React from 'react'

export const ThemeContext = React.createContext({
  themeName: 'teams',
  changeTheme: (newTheme: string) => {},
})
