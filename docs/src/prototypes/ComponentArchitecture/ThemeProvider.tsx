import * as React from 'react'
import { ThemeProvider as RealThemeProvider } from '@fluentui/react-theming'
import { customTheme } from './theme'

export const ThemeProvider: React.FunctionComponent<{}> = props => {
  return <RealThemeProvider theme={customTheme}>{props.children}</RealThemeProvider>
}
