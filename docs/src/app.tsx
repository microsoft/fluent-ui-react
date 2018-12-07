import * as React from 'react'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from '../../src/lib'
import { semanticCssOverrides } from './Style'
import { ThemeContext } from './context/theme-context'
import Router from './routes'

const semanticStylesOverrideTheme = {
  staticStyles: [semanticCssOverrides],
}

interface AppState {
  themeName: string
  changeTheme: (newTheme: string) => void
}

class App extends React.Component<any, AppState> {
  private changeTheme

  constructor(props) {
    super(props)

    this.changeTheme = newTheme => {
      this.setState({
        themeName: newTheme,
      })
    }

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      themeName: 'teams',
      changeTheme: this.changeTheme,
    }
  }
  render() {
    const { themeName } = this.state
    return (
      <ThemeContext.Provider value={this.state}>
        <Provider theme={mergeThemes(semanticStylesOverrideTheme, themes[themeName])}>
          <Router />
        </Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
