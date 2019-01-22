import * as React from 'react'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from '../../src/lib'
import { ThemeContext } from './context/ThemeContext'
import Router from './routes'

interface AppState {
  themeName: string
  changeTheme: (e, p) => void
}

class App extends React.Component<any, AppState> {
  private changeTheme

  constructor(props) {
    super(props)

    this.changeTheme = (e, p) => {
      this.setState({
        themeName: p.value,
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
    return (
      <ThemeContext.Provider value={this.state}>
        <Provider
          theme={mergeThemes(themes.teams, {
            // adjust Teams' theme to Semantic UI's font size scheme
            siteVariables: {
              htmlFontSize: '14px',
              bodyFontSize: '1rem',
            },
          })}
        >
          <Router />
        </Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
