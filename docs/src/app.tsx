import * as React from 'react'
import * as _ from 'lodash'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from 'src/lib'
import { ThemeContext } from './context/ThemeContext'
import Router from './routes'

interface AppState {
  themeName: string
  changeTheme: (event, data) => void
}

class App extends React.Component<any, AppState> {
  private changeTheme

  constructor(props) {
    super(props)

    this.changeTheme = (event, data) => {
      const themeName = _.camelCase(data.value)
      this.setState({
        themeName,
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
        <Provider
          theme={mergeThemes(themes[themeName], {
            // adjust Teams' theme to Semantic UI's font size scheme
            staticStyles: [
              {
                a: {
                  textDecoration: 'none',
                },
                html: {
                  fontSize: '14px',
                },
                body: {
                  fontSize: '1rem',
                },
              },
            ],
          })}
        >
          <Router />
        </Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
